import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}
const generateAuthToken = function (user) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error comparing password:", err);
    throw err;
  }
}

function encodeBase64(data) {
  try {
    return Buffer.from(data).toString("base64");
  } catch (err) {
    console.error("Error encoding to base64:", err);
    throw err;
  }
}

function decodeBase64(encodedData) {
  try {
    return Buffer.from(encodedData, "base64").toString("utf-8");
  } catch (err) {
    console.error("Error decoding from base64:", err);
    throw err;
  }
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per windowMs
  message:
    "Terlalu banyak request dari IP ini, coba lagi setelah beberapa saat.",
  standardHeaders: true, // Mengaktifkan pengiriman header `RateLimit-*`
  legacyHeaders: false, // Menonaktifkan pengiriman header `X-RateLimit-*`
});
export {
  limiter,
  hashPassword,
  comparePassword,
  encodeBase64,
  decodeBase64,
  generateAuthToken,
};
