const nodemailer = require("nodemailer");

console.log("SMTP USER:", process.env.BREVO_LOGIN);
console.log("SMTP PASS EXISTS:", !!process.env.BREVO_PASSWORD);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASSWORD
  }
});

module.exports = transporter;