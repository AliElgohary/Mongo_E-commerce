import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../schemas/user.js";
dotenv.config();

export const createUser = async (req, res, next) => {
  const body = req.body;
  const newUser = new User({
    email: body.email,
    password: body.password,
  });
  const data = await newUser.save();
  res.send(data);
};


export const getUers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  if (user.password != password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const payload = { userId: user._id, email: user.email, products: [] };
  const token = Jwt.sign(payload, process.env.JWT_SECRET);
  res.send({ ...payload, token });
};

