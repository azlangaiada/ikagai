import nodemailer from '/var/www/cosmedic/packages/cms/node_modules/nodemailer/lib/nodemailer.js'

const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const MAIL_TO   = process.env.MAIL_TO   || 'azlan@net1io.com'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

export async function sendContactEmail(opts: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const { name, email, message } = opts
  await transporter.sendMail({
    from: `"ikigaAI" <${SMTP_USER}>`,
    to: MAIL_TO,
    subject: `ikigaAI enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })
}
