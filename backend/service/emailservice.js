const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "your@email.com",
    pass: process.env.SMTP_PASS || "yourpassword",
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.SMTP_FROM || "no-reply@skillcon.com",
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendEmail };
