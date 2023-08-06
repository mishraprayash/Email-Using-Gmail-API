require('dotenv').config()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const Oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
Oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendEmail() {
    try {
        const accessToken = await Oauth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: '<Oauth2_setup_Email>',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: '<sending_email>',
            to: '<receiving email>',
            subject: 'Gmail API to send email using nodemailer and Oauth2',
            html: '<h2>Hello this is the testing email.</h2>'
        }

        const result = await transport.sendMail(mailOptions)
        return result


    } catch (error) {
        return error
    }
}

sendEmail().then((result) => {
    console.log('Email sent Sucessfully', result);
})
    .catch((error) => {
        console.log(error)
    })