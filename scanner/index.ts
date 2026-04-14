import 'dotenv/config'
import { fetchFacebookEmails, markAsRead } from './email-parser'
import { classify } from './classifier'
import { isAlreadyProcessed, saveScannedPost, disconnect } from './db'
import { sendNotification } from './notifier'

const CONFIDENCE_THRESHOLD = 0.6
const POLL_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

async function scan(): Promise<void> {
  console.log(`[${new Date().toLocaleString('he-IL')}] Scanning for new posts...`)

  let emails
  try {
    emails = await fetchFacebookEmails()
  } catch (err) {
    console.error('Failed to fetch emails:', err)
    return
  }

  if (emails.length === 0) {
    console.log('No new Facebook notification emails found.')
    return
  }

  console.log(`Found ${emails.length} unread Facebook notification(s).`)
  const processedUids: number[] = []

  for (const email of emails) {
    try {
      // Skip duplicates
      if (await isAlreadyProcessed(email.messageId)) {
        console.log(`  Skipping already processed: ${email.messageId}`)
        processedUids.push(email.uid)
        continue
      }

      // Skip emails with no useful content
      if (!email.postContent || email.postContent.trim().length < 10) {
        console.log(`  Skipping empty/short email: ${email.subject}`)
        processedUids.push(email.uid)
        continue
      }

      console.log(`  Classifying: "${email.subject.substring(0, 60)}..."`)

      // Classify with AI
      const result = await classify(email.postContent)

      const isNotifiable = result.isRelevant && result.confidence >= CONFIDENCE_THRESHOLD
      let notificationSent = false

      // Send notification if relevant
      if (isNotifiable) {
        try {
          await sendNotification(email, result)
          notificationSent = true
          console.log(`  ✅ RELEVANT (${result.category}, ${Math.round(result.confidence * 100)}%) — notification sent!`)
        } catch (notifyErr) {
          console.error(`  Failed to send notification:`, notifyErr)
        }
      } else {
        console.log(`  ⬜ Not relevant (${result.reasoning.substring(0, 80)})`)
      }

      // Save to database
      await saveScannedPost({
        source: 'facebook',
        sourceGroup: email.groupName,
        sourceUrl: email.postUrl,
        emailMessageId: email.messageId,
        postContent: email.postContent.substring(0, 5000),
        isRelevant: result.isRelevant,
        confidence: result.confidence,
        category: result.category,
        reasoning: result.reasoning,
        suggestedReply: result.suggestedReply,
        notificationSent,
      })

      processedUids.push(email.uid)
    } catch (err) {
      console.error(`  Error processing email "${email.subject}":`, err)
    }
  }

  // Mark all processed emails as read
  if (processedUids.length > 0) {
    try {
      await markAsRead(processedUids)
      console.log(`Marked ${processedUids.length} email(s) as read.`)
    } catch (err) {
      console.error('Failed to mark emails as read:', err)
    }
  }

  console.log('Scan complete.\n')
}

async function main(): Promise<void> {
  const isOnce = process.argv.includes('--once')

  console.log('========================================')
  console.log('  LevelUp Lead Scanner')
  console.log(`  Mode: ${isOnce ? 'Single run' : `Polling every ${POLL_INTERVAL_MS / 1000}s`}`)
  console.log('========================================\n')

  if (isOnce) {
    await scan()
    await disconnect()
    process.exit(0)
  }

  // Continuous polling mode
  await scan()
  setInterval(scan, POLL_INTERVAL_MS)

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nShutting down...')
    await disconnect()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('\nShutting down...')
    await disconnect()
    process.exit(0)
  })
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
