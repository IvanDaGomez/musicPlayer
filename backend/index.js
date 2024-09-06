import express from "express"
import cors from "cors"
import mainRouter from "./routes/mainRouter/mainRouter.js"

const app = express();

app.use(cors())
app.use(express.urlencoded({extended : true}))

app.get("/", mainRouter)
const PORT = process.env.PORT ?? 3030;

app.listen(PORT, ()=>{
    console.log("Server is listening on http://localhost:" + PORT)
})