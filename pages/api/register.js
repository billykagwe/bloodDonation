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
      .then((x) => {
        console.log({ x });
        return x?.insertedId ? res(x) : rej({ error: "Could not save data" });
      })
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
        html: `
        <div>
        <strong>Dear ${firstName} ${lastName}  </strong> 
         <p> Thank you for voluntarily lending your forearm by filling the online blood donor registration form.</p>
         <p>When there is an emergency, it takes a lot of effort and time to make resources available to the needy.</p>
         <p>With this initiative, you have contributed in reducing time and effort to find a suitable match for the needy.
         This saving in time can help in getting right treatment at the right time to the patient.</p>
         <p>This is just a start, but your participation and suggestions can make this initiative a never ending journey.</p>
         <p>For any suggestions that can improve this noble cause, please email on blooddonors.toc@gmail.com.</p>
         <p>Please find your registration details below, you can ammend details by replying to this email with the details.</p>
         <p>Occupation: ${occupation}</p>
         <strong>Blood Group: ${bloodGroup}</strong>
         <p>Phone Number: ${phone}</p>
         <p>Native Place: ${nativePlace}</p>
         <p>County: ${county}</p>
         <p>City: ${city} </p>
         <p>Date of Birth: ${day}/${month}/${year}</p>
         <p>Once again, thank you so much!</p>
         <p>Team Oshwal Care</p>
        </div>
      `,
      };
      sgMail
        .send(msg)
        .then(() => res({ Success: "Onboarding email sent" }))
        .catch(rej);
    });
};
