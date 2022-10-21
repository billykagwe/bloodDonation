/** @format */

import bcrypt from "bcryptjs";
import { Task } from "../../utils/types";
import { connectToDatabase } from "../../utils/database";

const handler = async (req, res) => {
  try {
    //--------------------------------------------------------------------------
    // Connect Database
    //--------------------------------------------------------------------------
    const { db } = await connectToDatabase();

    //--------------------------------------------------------------------------
    // Extract password from request
    //--------------------------------------------------------------------------

    const { password } = JSON.parse(req.body);

    //--------------------------------------------------------------------------
    // Validate Password
    //--------------------------------------------------------------------------
    const validatePassword = (password) => {
      return password && password.length > 5;
    };
    const TValidatePassword = (password) =>
      validatePassword(password)
        ? Task.of(password)
        : Task.rejected({ error: "Invalid Password" });

    //--------------------------------------------------------------------------
    // Validate Password
    //--------------------------------------------------------------------------

    const encryptPassword = (password) => bcrypt.hash(password, 10);
    const TEncryptPassword = (password) =>
      Task((rej, res) =>
        encryptPassword(password)
          .then(res)
          .catch((err) => rej({ error: "Invalid Password" }))
      );

    //--------------------------------------------------------------------------
    // Save  Password in the db
    //--------------------------------------------------------------------------

    const savePassword = (hash) => {
      return db
        .collection("login")
        .updateMany({}, { $set: { password: hash } });
    };
    const TSavePassword = (hash) =>
      Task((rej, res) =>
        savePassword(hash)
          .then((updateResult) =>
            !!updateResult.modifiedCount
              ? res({ success: true })
              : rej({ success: false })
          )
          .catch({ success: false })
      );

    //--------------------------------------------------------------------------
    // Workflow
    //--------------------------------------------------------------------------

    return TValidatePassword(password)
      .chain(TEncryptPassword)
      .chain(TSavePassword)
      .fork(res.json, res.json);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export default handler;
