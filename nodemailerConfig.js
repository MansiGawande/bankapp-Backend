import nodemailer  from "nodemailer" /// Import the Nodemailer library

const tanspoter = nodemailer.createTransport({
    service:"gmail",
    username: process.env.MAIL_USERNAME,
 password: process.env.MAIL_PASSWORD,

})