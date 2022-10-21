/** @format */
import cookie from "cookie";
const handler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    })
  );

  return res.status(200).json({
    success: "Successfully logged out",
  });
};

export default handler;
