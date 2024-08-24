import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "no user found" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorize" });
  }
};

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(decoded.id);
  const roles = await Role.find({ _id: { $in: user?.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require moderator role" });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(decode.id);
  const roles = await Role.find({ _id: { $in: user?.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require admin role" });
};
