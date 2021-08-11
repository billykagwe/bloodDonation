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
      .chain(sendOnboardingEmail(body?.email))
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
const sendOnboardingEmail = (email) => () =>
  Task((rej, res) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: "blooddonars.toc@gmail.com", // Change to your verified sender
      subject: "Oshwal Blood Donation Registration",
      text: "Registration data uploaded successfully",
      html: "<strong>Thank you </strong>",
    };
    sgMail
      .send(msg)
      .then(() => res({ Success: "Onboarding email sent" }))
      .catch(rej);
  });
