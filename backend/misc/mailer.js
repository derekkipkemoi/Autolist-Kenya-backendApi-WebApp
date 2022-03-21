const { reject } = require('lodash')
const nodemailer = require('nodemailer')

require("dotenv").config();

console.log("Mailer variables",process.env.MAILGUN_PASS)

const transport = nodemailer.createTransport({
            service: "mailgun",
                port: 587,
                auth: {
                    user: process.env.MAILGUN_USER, // generated ethereal user
                    pass: process.env.MAILGUN_PASS, // generated ethereal password
                },
})

module.exports ={
    sendEmail(from, to, subject, html){
        return new Promise((resolve, reject) => {
            transport.sendMail({from, to, subject, html},(err, info)=>{
                if(err){
                    console.log("Email sending error", err)
                    reject(err)
                    
                }else{
                    console.log("Email sending success", info)
                    resolve(info)
                }

                
            })
        })
    }
}