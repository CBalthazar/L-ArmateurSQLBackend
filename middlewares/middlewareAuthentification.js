import jwt from "jsonwebtoken";
import userService from "../instanciation.js";

function authToken(req, res, next) {
  const token = req.cookie.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) throw new Error("invalid token");
    const user = await userService.getUserById(decoded.id);
    req.userId = decoded.id;
    req.userMail = user.mail;
  });
}

export default authToken;
