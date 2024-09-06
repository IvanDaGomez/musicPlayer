import { Router } from "express"

const mainRouter = Router();

mainRouter.get("/", musicController.getAllPlaylists)

export { mainRouter };