var nodemailer = require('nodemailer');


const sendmail = (email,token) => {
    const msg = {
        from: "",
        to: "",
        subject: "Password change request accepted",
        text: "Use the link provided to change our account password " +
        "" + token
    };
    
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
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
