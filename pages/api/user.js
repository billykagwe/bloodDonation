/** @format */
import { Task } from "../../utils/types";
import jwt from "jsonwebtoken";
const handler = (req, res) => {
  const token = req.cookies.token;

  return verifyToken(token).fork(res.json, res.status(200).json);
};

export default handler;

const verifyToken = (token) => {
  return Task((rej, res) => {
    try {
      const user = jwt.verify(token || "", "somekey");
      res({ ...user, isLoggedIn: true });
    } catch (error) {
      rej({
        isLoggedIn: false,
        user: null,
      });
    }
  });
};
