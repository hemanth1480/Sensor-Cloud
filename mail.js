var nodemailer = require('nodemailer');
require('dotenv').config();


const sendmail = (email,token) => {
    const msg = {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: "Password change request accepted",
        text: "Use the link provided to change our account password " +
        process.env.MAIL_JS + token
    };
    
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        },
        port:465,
        host: "smtp.gmail.com"
    })
    .sendMail(msg, (err) => {
        if(err) {
            return console.log("error", err);
        } else {
            // return console.log("mail send");
        }
    });
}

module.exports = sendmail;
