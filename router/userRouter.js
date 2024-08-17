import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createNewUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userControllers.js";
const router = express.Router();
const userRouter = router
  .get("/users", authenticateToken, getUsers)
  .get("/users/:id", authenticateToken, getUserById)
  .post("/users", createNewUser)
  .put("/users/:id", authenticateToken, updateUser)
  .delete("/users/:id", authenticateToken, deleteUser);

export default userRouter;
