/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../utils/database";
import sgMail from "@sendgrid/mail";
import { Task } from "../../utils/types";
import nodemailer from "nodemailer";

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
        return x?.insertedId ? res(x) : rej({ error: "Could not save data" });
      })
      .catch((x) => rej({ error: x }))
  );

//////////////////////////////////////////////////////////////////////////
const sendOnboardingEmail = (body) => {
  const {
    email,
    firstName,
    middleName,
    lastName,
    occupation,
    bloodGroup,
    day,
    month,
    year,
    city,
    county,
    contactPhone,
  } = body;
  return () =>
    Task((rej, res) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "compassion@teamoshwalcare.com", // generated ethereal user
          pass: "TOC@2020", // generated ethereal password
        },
      });

      const msg = {
        to: email, // Change to your recipient
        from: "compassion@teamoshwalcare.com", // Change to your verified sender
        subject: "Blood Donation Registration",
        html: `
                <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>

          <style>
            color: black;
            font-family: "Montserrat", Verdana, Arial, sans-serif;
          </style>
        </head>
        <body
          style="
            /* margin: auto; */
            padding: 10px;
            font-size: 14px;
            max-width: 600px;
            line-height: 1rem;
            font-family: 'Open Sans', Helvetica, Arial, sans-serif !important;
            letter-spacing: 1px;
            /* margin: auto; */
          "
        >
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/a8268fe13e13acd8/d12478f4-e4a0-4586-9e3a-5b85d6acfef2/911x729.png"
            style="
              height: 100px;
              display: block;
              margin-bottom: 16px;
              margin-top: 10px;
            "
          />
          <strong>Dear ${firstName} ${middleName} ${lastName} </strong>
          <p>
            Thank you for voluntarily lending your forearm by filling the online blood
            donor databank form.
          </p>
          <p>
            When there is an emergency, it takes a lot of effort and time to make
            resources available to the needy patient.
          </p>
          <p>
            With this initiative you have done a valuable contribution in reducing the
            time and effort to find suitable match for the needy. This saving in time
            can help in getting right treatment at the right time to the needy
            patient.
          </p>
          <p>
            This is just a start, but your participation and suggestions can make this
            initiative a continuous chain. We hope this chain comprises of more and
            more members like you who are always available to help others and spread
            love and compassion for each other.
          </p>

          <div style=" border-radius:3px;  solid green;">
            For any suggestions that can improve this noble cause, please email on
            compassion@teamoshwalcare.com Please find your registration details below,
            you can amend details by replying to this email with the change request.

            <p
              style="
                max-width: 700px;
                font-size: 14px;
                /* line-height: 25px; */
                align-text: center;
              "
            >
              Occupation: ${occupation}
            </p>
            <strong>Blood Group: ${bloodGroup}</strong>
            <p
              style="
                max-width: 700px;
                font-size: 14px;
                /* line-height: 25px; */
                align-text: center;
              "
            >
              Phone Number: ${contactPhone}
            </p>
            <p
              style="
                max-width: 700px;
                font-size: 14px;
                /* line-height: 25px; */
                align-text: center;
              "
            >
              County: ${county}
            </p>
            <p
              style="
                max-width: 700px;
                font-size: 14px;
                /* line-height: 25px; */
                align-text: center;
              "
            >
              City: ${city}
            </p>
            <p
              style="
                max-width: 700px;
                font-size: 14px;
                /* line-height: 25px; */
                align-text: center;
              "
            >
              Date of Birth: ${day}/${month}/${year}
            </p>

            <strong style="font-size: 18px;">Discaimer</strong>
          </div>
          <p
            style="
              max-width: 700px;
              font-size: 14px;
              /* line-height: 25px; */
              align-text: center;
            "
          >
            The information produced by the user of the form will be used in the same
            format by Team Oshwal Care for the purpose of helping the needy as per
            their requirements.
          </p>
          <p
            style="
              max-width: 700px;
              font-size: 14px;
              /* line-height: 25px; */
              align-text: center;
            "
          >
            This information will not be used for any commercial benefit. The purpose
            of this initiative is to help each other during need.
          </p>
          <p
            style="
              max-width: 700px;
              font-size: 14px;
              /* line-height: 25px; */
              align-text: center;
            "
          >
            Information of the blood group of the donor in this form does not qualify
            a donor to donate blood to the needy patient. The donor must produce all
            his information to the doctor and seek further guidance on eligibility to
            donate at every instance of blood donation
          </p>
          <p
            style="
              max-width: 700px;
              font-size: 14px;
              /* line-height: 25px; */
              align-text: center;
            "
          >
            It is the responsibility of the donor and the party seeking help from the
            donor to verify each other’s information before engaging in any
            transaction. Team Oshwal Care will just share the information as provided
            by the user of this platform. Team Oshwal Care is not liable for any false
            or incorrect information.
          </p>
          <div></div>

          <div style="">
            <p style="max-width: 700px; align-text: center; font-size: 14px;">
              We thank you for your contribution for this noble cause. May god give
              you more and more strength to continue doing such benevolent activities.
            </p>
            <p style="max-width: 700px; font-size: 14px;">Team Oshwal Care</p>
          </div>
        </body>
      </html>

        `,
      };
      return transporter
        .sendMail(msg)
        .then(() => res({ Success: "Onboarding email sent" }))
        .catch(rej);
    });
};
