import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel";
import { serialize } from "v8";
import cookie from "cookie";

dotenv.config();

const SECRET_KEY: Secret | undefined = process.env.MY_SECRET;

// Handling the signup process.
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, secondPassword } = req.body;

  if (password === secondPassword) {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    try {
      await newUser.save();
      let token;

      token = jwt.sign({ newUser }, SECRET_KEY as string, {
        expiresIn: "1h",
      });

      console.log(token);

      res.cookie("access_token", "Bearer " + token, {
        httpOnly: true,
      });

      //   const serialized = cookie.serialize("token", token, {
      //     httpOnly: true,
      //   });
      //   res.setHeader("Set-Cookie", serialized);

      res.status(201).json({
        success: true,
        data: { userId: newUser.id, email: newUser.email, token },
      });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  } else {
    res.status(400).json({ message: "Passwords don't match" });
  }
};

export { signUp };
