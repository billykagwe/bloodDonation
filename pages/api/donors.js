/** @format */
import { connectToDatabase } from "../../utils/database";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
console.log({db})
  return await db
    .collection("Donors")
    .find({})
    .toArray()
    .then(res.json)
    .catch(() => res.json({ erro: "Unable to fetch" }));
}
