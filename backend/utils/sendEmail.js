const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMPT_SERVICE,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.SMPT_USER,
      clientId:
        "312677121766-8erdovb0p09tmrt5mc6358a7s5fkliae.apps.googleusercontent.com",
      pass: process.env.SMPT_PASS,
      clientSecret: "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",
    },
  });

  const mailOptions = {
    from: process.env.SMPT_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
