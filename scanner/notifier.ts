import nodemailer from 'nodemailer'
import { ClassificationResult, ParsedEmail } from './types'

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const categoryLabels: Record<string, string> = {
  'middle-school': 'חטיבת ביניים',
  'bagrut': 'בגרות',
  'academic': 'אקדמי',
  'pre-academic': 'קדם-אקדמי',
  'other': 'אחר',
}

export async function sendNotification(
  email: ParsedEmail,
  result: ClassificationResult
): Promise<void> {
  const transporter = createTransporter()
  const categoryLabel = categoryLabels[result.category] || result.category
  const confidencePercent = Math.round(result.confidence * 100)

  const postLink = email.postUrl
    ? `<a href="${email.postUrl}" style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 8px 0;">🔗 פתח את הפוסט בפייסבוק</a>`
    : '<p style="color: #ef4444;">לא נמצא קישור לפוסט</p>'

  await transporter.sendMail({
    from: `"LevelUp Scanner" <${process.env.SMTP_USER}>`,
    to: process.env.SCANNER_EMAIL_TO || process.env.EMAIL_TO,
    subject: `🎯 ליד חדש! ${categoryLabel} — ${email.groupName}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); padding: 20px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">🎯 ליד חדש נמצא!</h2>
          <p style="color: #94b8db; margin: 4px 0 0;">קבוצה: ${email.groupName}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
              ${categoryLabel}
            </span>
            <span style="background: ${confidencePercent >= 80 ? '#22c55e' : confidencePercent >= 60 ? '#f59e0b' : '#ef4444'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
              ביטחון: ${confidencePercent}%
            </span>
          </div>

          <h3 style="color: #1e3a5f; margin: 16px 0 8px;">📝 תוכן הפוסט:</h3>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.6;">
${email.postContent.substring(0, 500)}
          </div>

          <h3 style="color: #1e3a5f; margin: 16px 0 8px;">💬 תגובה מוצעת (העתק והדבק):</h3>
          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border: 2px solid #22c55e; white-space: pre-wrap; line-height: 1.6; font-size: 16px;">
${result.suggestedReply}
          </div>

          <div style="margin-top: 16px; text-align: center;">
            ${postLink}
          </div>

          <details style="margin-top: 16px;">
            <summary style="color: #64748b; cursor: pointer;">AI Analysis</summary>
            <p style="color: #64748b; font-size: 13px; margin-top: 8px;">${result.reasoning}</p>
          </details>
        </div>

        <div style="background: #1e293b; padding: 12px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">LevelUp Lead Scanner · ${new Date().toLocaleString('he-IL')}</p>
        </div>
      </div>
    `,
  })
}
