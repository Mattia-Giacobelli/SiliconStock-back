const transporter = require("./mailtrap");

async function sendOrderEmail(to, orderId) {
  await transporter.sendMail({
    from: process.env.MAILTRAP_FROM,
    to,
    bcc: "siliconstock@email.com",
    subject: "Ordine ricevuto",
    html: `
      <h2>Grazie per il tuo ordine</h2>
      <p>ID ordine: <b>${orderId}</b></p>
    `,
  });
}

module.exports = sendOrderEmail;