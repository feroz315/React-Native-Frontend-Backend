const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: "feroz3151@gmail.com",
    pass: "mynjyiryhtxrzmvs",
  },
});

const sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: "alam@gmail.com",
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a new password reset ${token} It expires in 1 hour.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };