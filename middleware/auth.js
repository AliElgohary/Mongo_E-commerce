import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const [_, token] = req.headers.authorization?.split(" ");
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: error, message: "Unauthenticated" });
  }
};