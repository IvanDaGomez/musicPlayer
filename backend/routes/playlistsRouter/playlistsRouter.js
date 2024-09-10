import { Router } from "express";

const playlistsRouter = Router();

playlistsRouter.get("/", playlistsController.getAllPlaylists())

playlistsRouter.get("/:playlistId", playlistsController.getPlaylistById())

playlistsRouter.get("/:playlistAuthorId", playlistsController.getPlaylistsByAuthor())


export { playlistsRouter }