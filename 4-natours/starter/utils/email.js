const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '95ef3814170804',
      pass: '864727ac57cfc8',
    },
  });
  // const transporter = nodemailer.createTransport({
  //   service: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });
  // 2) Define the email options

  const mailOptions = {
    from: 'Zac Summers <hello@zac.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html,
  };
  // 3) actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// GMAIL SET UP FOR MAILING
// Activate in gmail "less secure app" option. not to be good to use for a production app because you'll get spam
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
