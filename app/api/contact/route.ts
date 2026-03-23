import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, phone, email, level, message } = data

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'שם וטלפון הם שדות חובה' },
        { status: 400 }
      )
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || '',
        level: level || '',
        message: message || '',
      },
    })

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"LevelUp — טופס יצירת קשר" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `פניה חדשה מ${name}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px;">
            <h2 style="color: #1e3a5f;">פניה חדשה מהאתר</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">שם</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">טלפון</td><td style="padding: 8px; border-bottom: 1px solid #eee;" dir="ltr">${phone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">אימייל</td><td style="padding: 8px; border-bottom: 1px solid #eee;" dir="ltr">${email || '—'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">רמה</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${level || '—'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">הודעה</td><td style="padding: 8px;">${message || '—'}</td></tr>
            </table>
            <p style="color: #64748b; font-size: 12px; margin-top: 16px;">פניה #${lead.id} · ${new Date().toLocaleString('he-IL')}</p>
          </div>
        `,
      })
    } catch (emailError) {
      // Log email error but don't fail the request — lead is already saved
      console.error('Failed to send email notification:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'שגיאה בשרת' },
      { status: 500 }
    )
  }
}
