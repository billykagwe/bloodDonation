/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../utils/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const donors = db.collection("Donors");

    const body = JSON.parse(req.body);

    donors
      .insertOne(body)
      .then(res.status(200).json)
      .catch(res.status(400).json);
  }
}
