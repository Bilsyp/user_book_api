import mongoose from "mongoose";
import User from "./userModel.js";
import { comparePassword } from "../utils/index.js";
const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

authSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email atau password salah");
  }

  if (!user.password) {
    throw new Error("Password tidak ditemukan untuk pengguna ini");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Email atau password salah");
  }

  return user;
};

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
