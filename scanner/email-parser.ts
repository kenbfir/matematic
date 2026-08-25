import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
import { ParsedEmail } from './types'

function createClient(): ImapFlow {
  return new ImapFlow({
    host: process.env.IMAP_HOST || 'imap.gmail.com',
    port: Number(process.env.IMAP_PORT) || 993,
    secure: true,
    auth: {
      user: process.env.IMAP_USER || '',
      pass: process.env.IMAP_PASS || '',
    },
    logger: false,
  })
}

function extractPostUrl(html: string): string {
  // Match Facebook group post URLs
  const patterns = [
    /https?:\/\/(?:www\.)?facebook\.com\/groups\/[^\/]+\/posts\/\d+/g,
    /https?:\/\/(?:www\.)?facebook\.com\/groups\/[^\/]+\/permalink\/\d+/g,
    /https?:\/\/(?:www\.)?facebook\.com\/groups\/\d+\/?\?[^"'\s]*/g,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return match[0]
  }

  // Fallback: any facebook.com link
  const fbLink = html.match(/https?:\/\/(?:www\.)?facebook\.com\/[^"'\s>]+/)
  return fbLink ? fbLink[0] : ''
}

function extractGroupName(subject: string): string {
  // Facebook email subjects are typically like: "[Group Name] New post" or "New post in Group Name"
  const patterns = [
    /\[([^\]]+)\]/,                    // [Group Name]
    /new post in (.+)/i,               // New post in Group Name
    /פוסט חדש בקבוצה (.+)/,            // Hebrew: new post in group
    /פוסט חדש ב(.+)/,                  // Hebrew: new post in
  ]

  for (const pattern of patterns) {
    const match = subject.match(pattern)
    if (match) return match[1].trim()
  }

  return subject
}

function isGroupPostNotification(subject: string, html: string): boolean {
  const lower = subject.toLowerCase()
  const lowerHtml = html.toLowerCase()

  // Exclude account/security notifications
  const excludePatterns = [
    'new email address',
    'password',
    'login',
    'sign in',
    'security',
    'confirm your',
    'verify your',
    'birthday',
    'friend request',
    'marketplace',
    'memory',
    'memories',
    'poked you',
    'tagged you in',
    'liked your',
    'commented on your',
    'replied to your',
  ]
  if (excludePatterns.some(p => lower.includes(p))) return false

  // Include if it looks like a group post
  const includePatterns = [
    'posted in',
    'new post in',
    'wrote in',
    'פוסט חדש',
    'פרסם בקבוצה',
    'כתב בקבוצה',
    '/groups/',
  ]
  if (includePatterns.some(p => lower.includes(p) || lowerHtml.includes(p))) return true

  // Also include if HTML contains a group link
  if (lowerHtml.includes('facebook.com/groups/')) return true

  return false
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export async function fetchFacebookEmails(): Promise<ParsedEmail[]> {
  const client = createClient()
  const emails: ParsedEmail[] = []

  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')

    try {
      // Search for unread emails from Facebook
      const messages = client.fetch(
        {
          seen: false,
          from: 'facebookmail.com',
        },
        {
          uid: true,
          envelope: true,
          source: true,
        }
      )

      for await (const msg of messages) {
        try {
          if (!msg.source) {
            console.error(`No source for email UID ${msg.uid}, skipping`)
            continue
          }
          const parsed = await simpleParser(msg.source)
          const html = parsed.html || ''
          const text = parsed.text || stripHtml(typeof html === 'string' ? html : '')
          const subject = parsed.subject || ''

          // Skip non-group-post notifications (account alerts, login notices, etc.)
          if (!isGroupPostNotification(subject, typeof html === 'string' ? html : '')) {
            continue
          }

          const postUrl = extractPostUrl(typeof html === 'string' ? html : '')
          const groupName = extractGroupName(subject)
          const postContent = text.substring(0, 2000) // Limit content length

          emails.push({
            messageId: parsed.messageId || `uid-${msg.uid}`,
            uid: msg.uid,
            subject,
            postContent,
            groupName,
            postUrl,
            receivedAt: parsed.date || new Date(),
          })
        } catch (parseErr) {
          console.error(`Failed to parse email UID ${msg.uid}:`, parseErr)
        }
      }
    } finally {
      lock.release()
    }

    return emails
  } finally {
    await client.logout()
  }
}

export async function markAsRead(uids: number[]): Promise<void> {
  if (uids.length === 0) return

  const client = createClient()
  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')
    try {
      await client.messageFlagsAdd(uids, ['\\Seen'], { uid: true })
    } finally {
      lock.release()
    }
  } finally {
    await client.logout()
  }
}
