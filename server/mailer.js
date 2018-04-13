'use strict';

const nodemailer = require('../node_modules/nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(bodyParser.json());

app.post('/', (req, res) => {

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    console.log(account);
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'painterapp121@gmail.com',
                pass: 'asdfGh321'
            },
            logger: true,
            debug: true // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: 'Painter app ',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'Vadim <ka.vadim@gmail.com>',

        // Subject of the message
        subject: "Message From Painter app - From " + req.body.name + "<" + req.body.email + ">",

        // plaintext body
        text: req.body.message,

        // HTML body
        html:
        req.body.message,

        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            }
        ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
});


})

app.listen(3000, () => console.log('Example app listening on port 3000!'))