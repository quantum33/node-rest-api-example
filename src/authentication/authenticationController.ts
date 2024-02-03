import express from "express";

import { createUser, getUserByEmail } from "../db/users";
import { random, encryptPassword } from "./crypter";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: encryptPassword(salt, password),
      },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    const expectedHash = encryptPassword(user.authentication.salt, password);
    if (expectedHash != user.authentication.password) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = encryptPassword(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("MY-COOKIE", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};
