/** @format */

import { connectToDatabase } from "../../utils/database";
import { Task } from "../../utils/types";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    //--------------------------------------------------------------
    // Generate jwt token
    //--------------------------------------------------------------
    const token = jwt.sign({}, "blooddonors", { expiresIn: 60 * 60 * 2 });
    const TGenToken = Task.of(token);

    //--------------------------------------------------------------
    // save token to db
    //--------------------------------------------------------------
    const saveToken = (token) =>
      db.collection("login").updateMany({}, { $set: { updateToken: token } });

    const TSaveToken = (token) =>
      Task((rej, res) =>
        saveToken(token)
          .then(res)
          .catch((err) => rej({ error: err.message }))
      );

    //--------------------------------------------------------------
    // send email
    //--------------------------------------------------------------
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "compassion@teamoshwalcare.com", // generated ethereal user
        pass: "TOC@2020", // generated ethereal password
      },
    });

    const TSendEmail = (token) => {
      return Task((rej, res) => {
        const msg = {
          to: "hardik@keitt.co.ke", // Change to your recipient
          from: "compassion@teamoshwalcare.com", // Change to your verified sender
          subject: "Password Reset",
          html: `
          
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Change Password</title>
            </head>
            <body style="margin: 10; padding: 0; background-color: white">
              <div
                style="
                  background-color: rgb(0,0,0);
                  width: 300px;
                  padding: 0px;
                  margin-top: 19px;
                "
              >
                <img
                  src="http://cdn.mcauto-images-production.sendgrid.net/a8268fe13e13acd8/d12478f4-e4a0-4586-9e3a-5b85d6acfef2/911x729.png"
                  style="
                    height: 80px;
                    display: block;
                    margin-bottom: 16px;
                    margin-top: 10px;
                  "
                />
                <h2 style="margin-bottom: 0px">Change Password</h2>
                <p style="margin-top: 0">
                  To complete your password change click the button below.
                </p>

                <button
                  style="
                    background-color: black;
                    cursor: pointer;
                    border-width: 0;
                    padding: 10px;
                  "
                >
                  <a href=${`https://teamoshwalcare.com/resetPassword/${token}`} style="text-decoration: none; color: white">Change Password</a>
                </button>
              </div>
            </body>
          </html>
          
          `,
        };

        transporter.sendMail(msg).then(res).catch(rej);
      });
    };

    //--------------------------------------------------------------
    // Workflow
    //--------------------------------------------------------------
    const TSaveAndSendToken = (token) =>
      TSaveToken(token).chain(() => TSendEmail(token));

    TGenToken.chain(TSaveAndSendToken).fork(res.json, res.json);
  } catch (error) {
    console.log({ error });
    res.json({ success: false });
  }
};

export default handler;

// gen token - (saveToken to Db / send email) - respond to client
