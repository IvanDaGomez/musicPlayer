import express from "express"
import cors from "cors"
import { mainRouter } from "./routes/mainRouter/mainRouter.js"
import { usersRouter } from "./routes/usersRouter/usersRouter.js";
import { playlistsRouter } from "./routes/playlistsRouter/playlistsRouter.js";
const app = express();

app.use(cors())
app.use(express.urlencoded({extended : true}))

app.get("/api/", mainRouter)

app.get("/api/users", usersRouter)

app.get("/api/playlists", playlistsRouter)


const PORT = process.env.PORT ?? 3030;

app.listen(PORT, ()=>{
    console.log("Server is listening on http://localhost:" + PORT)
})