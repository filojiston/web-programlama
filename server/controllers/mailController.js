const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'firmayamailgonderenmail@gmail.com',
    pass: '12345678a*',
  },
});

async function sendEmailForMaterial(material) {
  return transporter.sendMail({
    from: 'firmayamailgonderenmail@gmail.com',
    to: '19060909@stu.omu.edu.tr',
    subject: 'web programlama projesi',
    text: `${material.name} hammaddesi kritik düzeyin altına düştü. En yakın zamanda sipariş vermeniz gerekiyor.`,
  });
}

module.exports = {
  sendEmailForMaterial
}