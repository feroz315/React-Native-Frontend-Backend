const nodemailer = require('nodemailer');
const URL = "http://192.168.1.7:3000/api/reset-password";

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
    text: `http://192.168.1.7:3000/api/reset-password?token=${token} It expires in 1 hour.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };