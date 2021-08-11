/** @format */

import { connectToDatabase } from "../../utils/database";
import bcrypt from "bcryptjs";
import { Task } from "../../utils/types";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const collection = db.collection("login");
    const { email, password } = req.body;

    findUser(collection, email)
      .chain(comparePassword(password))
      .chain(signToken)
      .chain(setAuthHeader(res))
      .fork(res.json, (x) => x);
  }
};

export default handler;

///////////////////////////////////////////////////////
const setAuthHeader = (res) => (token) =>
  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        path: "/",
      })
    )
    .json({ success: true });

////////////////////////////////////////////////////////////////////////////////////
const comparePassword = (password) => (user) => {
  console.log({ user, password });

  return Task((rej, res) =>
    bcrypt
      .compare(password, user?.password)
      .then((isMatch) => {
        console.log({ isMatch });
        return isMatch ? res(user) : rej({ error: "Invalid Credentials" });
      })
      .catch((err) => rej({ error: err }))
  );
};

////////////////////////////////////////////////////////////////////////////
const signToken = (user) => {
  const { password, ...userWithoutPassword } = user;
  return Task((rej, res) => {
    const token = jwt.sign(userWithoutPassword, "somekey");
    return res(token);
  });
};

//////////////////////////////////////////////////////////////////////////////
const findUser = (collection, email) =>
  Task((rej, res) => collection.findOne({ email }).then(res).catch(rej));
