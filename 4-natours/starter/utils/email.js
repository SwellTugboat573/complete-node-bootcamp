const pug = require('pug');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const htmlToText = require('html-to-text');

// new Email(user, url).sendWelcome; // the user contains

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Jonas Schmedtmass <${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //useSendgrid
      return nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey:
            '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', //process.env.SENDGRID_PASSWORD,
        }),
      );
    }
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '95ef3814170804',
        pass: '864727ac57cfc8',
      },
    });
  }

  async send(template, subject) {
    // send the actual email
    // 1) render the HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    //2) define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
