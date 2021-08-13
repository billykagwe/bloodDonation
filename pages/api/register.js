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

    insertData(donors, body)
      .chain(sendOnboardingEmail(body))
      .fork(res.json, res.json);
  }
}

const insertData = (donors, data) =>
  Task((rej, res) =>
    donors
      .insertOne(data)
      .then((x) =>
        x?.insertedId ? res(x) : rej({ error: "Could not save data" })
      )
      .catch(rej)
  );

//////////////////////////////////////////////////////////////////////////
const sendOnboardingEmail = (body) => {
  console.log({ body });
  const {
    email,
    firstName,
    lastName,
    phone,
    occupation,
    bloodGroup,
    city,
    nativePlace,
    county,
    day,
    month,
    year,
  } = body;
  return () =>
    Task((rej, res) => {
      sgMail.setApiKey(process.env.SENDGRID_KEY);

      const msg = {
        to: email, // Change to your recipient
        from: "blooddonars.toc@gmail.com", // Change to your verified sender
        subject: "Blood Donation Registration",
        text: "Registration data uploaded successfully",
        html: `<strong>Dear ${firstName} ${lastName}  </strong> 
         <p> Thank you for filling the registration form. Please find the details filled below </p>
         <p>Occupation: ${occupation}</p>
         <strong>Blood Group: ${bloodGroup}</strong>
         <p>Phone Number: ${phone}</p>
         <p>Native Place: ${nativePlace}</p>
         <p>County: ${county}</p>
         <p>City: ${city} </p>
         <p>Date of Birth: ${day}/${month}/${year}</p>
        
      `,
      };
      sgMail
        .send(msg)
        .then(() => res({ Success: "Onboarding email sent" }))
        .catch(rej);
    });
};
