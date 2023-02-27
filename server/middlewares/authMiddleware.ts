import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

const SECRET_KEY: Secret | undefined = process.env.MY_SECRET;

// Handling post request
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, name, email, password } = req.body;

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign({ newUser }, SECRET_KEY as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(201).json({
    success: true,
    data: { userId: newUser.id, email: newUser.email, token: token },
  });
};

// handles login process
const login = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      SECRET_KEY as string,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};
