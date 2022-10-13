var nodemailer = require('nodemailer');


const sendmail = (email,token) => {
    const msg = {
        from: "hemanth.m1480@gmail.com",
        to: "hemanth.m1480@gmail.com",
        subject: "Password change request accepted",
        text: "Use the link provided to change our account password " +
        "http://localhost:59/accountVerification?verifyid=" + token
    };
    
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hemanth.m1480@gmail.com",
            pass: "frsvmfxhljxckees"
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