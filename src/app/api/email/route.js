const { NextResponse } = require('next/server');
const nodemailer = require('nodemailer');

async function POST(request) {
  const { email, firstName, lastName, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: process.env.NODEMAILER_EMAIL_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.BUSINESS_TO,
    subject: `Message from ${firstName} ${lastName} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

module.exports = { POST };
