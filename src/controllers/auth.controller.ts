import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, roles } = req.body;
  const userFound = User.find({ email });
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    console.log(foundRoles);
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();
  console.log(savedUser);
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, { expiresIn: 100000 });
  res.json(token);
};

export const signin = async (req: Request, res: Response) => {
  const userFound = await User.findOne({ email: req.body.email }).populate("roles");
  if (!userFound) return res.status(400).json({ message: "User not found" });
  const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid password" });
  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, { expiresIn: 100000 });
  res.json({ token });
};
