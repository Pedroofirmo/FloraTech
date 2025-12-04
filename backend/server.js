import express from "express"
import cors from "cors"
import { entrarRoute } from "./routes/entrarRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/entrar", entrarRoute);

app.listen(3333, () => console.log("Servidor rodando..."))
