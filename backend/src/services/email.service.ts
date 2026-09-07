import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

interface WelcomeEmailParams {
  to: string
  name: string
  role: string
  tempPassword: string
}

export async function sendWelcomeEmail({ to, name, role, tempPassword }: WelcomeEmailParams) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f97316; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .password-box { background: white; padding: 15px; border: 1px dashed #f97316; border-radius: 8px; text-align: center; margin: 20px 0; }
        .password { font-size: 24px; font-weight: bold; color: #f97316; letter-spacing: 2px; }
        .button { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
        .role-badge { display: inline-block; background: #f97316; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to D-AssetPro!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Your account has been created with the role of:</p>
          <p style="text-align: center;">
            <span class="role-badge">${role}</span>
          </p>
          
          <div class="password-box">
            <p style="margin-bottom: 8px; color: #6b7280;">Your temporary password:</p>
            <p class="password">${tempPassword}</p>
            <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">
              ⚠️ Please change this password after your first login.
            </p>
          </div>
          
          <p style="text-align: center;">
            <a href="${process.env.APP_URL}/login" class="button">Login to Dashboard</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>🔐 Security Tips:</strong><br>
            • Change your password immediately after first login<br>
            • Never share your password with anyone<br>
            • Contact your administrator if you have questions
          </p>
        </div>
        <div class="footer">
          <p>© 2026 D-AssetPro. All rights reserved.</p>
          <p>Powered by DreamMore</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@dassetpro.com',
      to,
      subject: '🎉 Welcome to D-AssetPro - Your Account Has Been Created',
      html,
    })
    console.log(`✅ Welcome email sent to ${to}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email failed:', error)
    return { success: false, error }
  }
}