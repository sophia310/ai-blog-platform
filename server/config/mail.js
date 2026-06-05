const { BrevoClient } = require("@getbrevo/brevo");

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY
});

const sendMail = async ({ to, subject, html }) => {
  return await client.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Lumina",
      email: process.env.BREVO_SENDER
    },
    to: [{ email: to }],
    subject: subject,
    htmlContent: html
  });
};

module.exports = { sendMail };