import { Router } from "express";

const usersRouter = Router()

usersRouter.get("/", usersController.getAllUsers())

usersRouter.get("/:userId", usersController.getUserById())

export { usersRouter }