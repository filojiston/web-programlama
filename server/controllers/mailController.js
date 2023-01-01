const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your email adress',
    pass: 'your password',
  },
});

async function sendEmailForMaterial(material) {
  return transporter.sendMail({
    from: 'your email address',
    to: 'target email address',
    subject: 'web programlama projesi',
    text: `${material.name} hammaddesi kritik düzeyin altına düştü. En yakın zamanda sipariş vermeniz gerekiyor.`,
  });
}

module.exports = {
  sendEmailForMaterial
}
