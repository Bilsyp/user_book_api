import express from "express";
import Auth from "../model/authModel.js";
import { generateAuthToken } from "../utils/index.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const token = generateAuthToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default authRouter;
