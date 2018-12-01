const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
    initTransport: (user, pass, service) => {
        const transporter = nodemailer.createTransport(smtpTransport({
            host: 'smtp.gmail.com', 
            service: 'gmail',//host of mail service provider
            port: 465,
            secure: true,
            auth: { user, pass },
            tls: {
                rejectUnauthorized: false
            }
        }))
        console.log('object')
        return  transporter 
    },
    sendEmail: async (temp, details, transporter) => {
                try {
                    const info = await transporter.sendMail(
                {
                    from: `"WebStore" ${details.from}`, // sender address
                    to: details.to, // list of receivers
                    subject: details.subject, // Subject line
                    html: temp// plain text body
                }
            )
            console.log('Message sent: %s', info.messageId);
            console.log('info', info);
        } catch (error) {
            console.log(error)
        }
    }
}