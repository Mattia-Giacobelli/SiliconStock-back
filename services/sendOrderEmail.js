const transporter = require("./mailtrap");


async function sendOrderEmail(to, order) {

  let userHtml
  let adminHtml

  const firstPartUser = `<style>
          img {
              width: 50px;
          }
      </style>
      <h2>Grazie per il tuo ordine <b>${order.id}</b></h2>
      <span>Totale: ${order.total_amount.toFixed(2)}</span>
      <table>
          <thead>
              <th></th>
              <th>Articolo</th>
              <th>Prezzo</th>
          </thead>
          <tbody>`

  const firstPartAdmin = `<style>
          img {
              width: 50px;
          }
      </style>
      <h2>Conferma creazione ordine <b>${order.id}</b></h2>
      <span>Totale: ${order.total_amount.toFixed(2)}</span>
      <table>
          <thead>
              <th></th>
              <th>Articolo</th>
              <th>Prezzo</th>
          </thead>
          <tbody>`

  let userBody

  order.products.forEach(article => {
    userBody += `<tr>
                  <td>
                  <img src="http://localhost:3000/${article.img}" alt=""></td>
                  <td>${article.product_name}</td>
                  <td>${article.price}</td>
              </tr>`
  })

  const closing = `</tbody>
    </table>`

  userHtml = firstPartUser + userBody + closing
  adminHtml = firstPartAdmin + userBody + closing

  const adminMail = 'admin@siliconstock.it'

  await transporter.sendMail({
    from: process.env.MAILTRAP_FROM,
    to,
    bcc: "siliconstock@email.com",
    subject: "Ordine ricevuto",
    html: userHtml
  });


  setTimeout(async () => {
    await transporter.sendMail({
      from: process.env.MAILTRAP_FROM,
      to: adminMail,
      bcc: "siliconstock@email.com",
      subject: "Ordine ricevuto",
      html: adminHtml
    });
  }, 11000)
}

module.exports = sendOrderEmail;