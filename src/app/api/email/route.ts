import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "kuriayun@gmail.com",
    subject: `Pesan dari Portofolio ${name} ${phone}`,
    text: `Pesan dari website portofolio
    Name : ${name}
    Email : ${email}
    Phone : ${phone}
    Message : ${message}`
  }
  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}