/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../utils/database";
import sgMail from "@sendgrid/mail";
import { Task } from "../../utils/types";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const donors = db.collection("Donors");
    const body = JSON.parse(req.body);
    return insertData(donors, body)
      .chain(sendOnboardingEmail(body))
      .fork(res.json, res.json);
  }
}

const insertData = (donors, data) =>
  Task((rej, res) =>
    donors
      .insertOne(data)
      .then((x) => {
        console.log({ x });
        return x?.insertedId ? res(x) : rej({ error: "Could not save data" });
      })
      .catch(rej)
  );

//////////////////////////////////////////////////////////////////////////
const sendOnboardingEmail = (body) => {
  const {
    email,
    firstName,
    lastName,
    occupation,
    bloodGroup,
    day,
    month,
    year,
    city,
    county,
    phone,
  } = body;
  return () =>
    Task((rej, res) => {
      sgMail.setApiKey(process.env.SENDGRID_KEY);

      const msg = {
        to: email, // Change to your recipient
        from: "blooddonars.toc@gmail.com", // Change to your verified sender
        subject: "Blood Donation Registration",
        html: `
          <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          
          <style>
          color:black;
          font-family: "Montserrat", Verdana, Arial, sans-serif;
          </style>

        </head>
        <body style=" margin: auto;padding: 10px;font-size: 20px;max-width: 800px; line-height:2rem; font-weight:500;font-family: 'Open Sans', Helvetica, Arial, sans-serif !important;letter-spacing:1.1px;margin:auto; ">
        <img src="http://cdn.mcauto-images-production.sendgrid.net/a8268fe13e13acd8/d12478f4-e4a0-4586-9e3a-5b85d6acfef2/911x729.png" style="height: 100px;display: block;margin-bottom: 16px;margin-top: 10px;">
          <strong>Dear ${firstName} ${lastName} </strong>
          <p style="font-size: 20px;font-weight: 00;max-width: 600px;line-height:2.4rem;color:white;padding:5px 10px; border-radius:5px ">
           " Thank you for voluntarily lending your forearm by filling the online blood
            donor registration form. 
            
            </p>
            <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">When there is an emergency, it takes a lot of
            effort and time to make resources available to the needy. 
          </p><p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;"> With this initiative, you have contributed in reducing time and effort to find a
            suitable match for the needy. This saving in time can help in getting
            right treatment at the right time to the patient. 
            </p>
            <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">This is just a start,
            but your participation and suggestions can make this initiative a never
            ending journey. For any suggestions that can improve this noble cause,
            please email on blooddonors.toc@gmail.com.
            </p>
            
            <div style=" border-radius:3px;  solid green;">
            <p style="text-decoration: underline;max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">Please find your registration
            details below, you can ammend details by replying to this email with the
            details.
          
          </p>
          
          <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">Occupation: ${occupation}</p>
          <strong>Blood Group: ${bloodGroup}</strong>
          <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">Phone Number: ${phone}</p>
          <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">County: ${county}</p>
          <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">City: ${city}</p>
          <p style="max-width: 700px;font-size: 16px;line-height: 25px;align-text: center;">Date of Birth: ${day}//${month}//${year}</p>
        
        
        </div>
        <div style=" solid green;">
        <p style="max-width: 700px;align-text: center;">Once again, thank you so much!</p>
          <p style="max-width: 700px;font-size: 16px;align-text: center;">Team Oshwal Care</p>
        </div>
        </body>
      </html>
        `,
      };
      return sgMail
        .send(msg)
        .then((u) => {
          console.log({ u });
          return res({ Success: "Onboarding email sent" });
        })
        .catch(rej);
    });
};
