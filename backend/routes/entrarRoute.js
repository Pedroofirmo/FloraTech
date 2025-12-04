import { Router } from "express"
import { conn } from "../database/dbconfig.js";

const entrarRoute = Router();

entrarRoute.post("/", (req, res) => {
    const { email, senha } = req.body;

    conn.query(
        `select * from usuarios where email='${email}' and senha='${senha}'`,
        (err, result) => {
            if (err) {
                res.json(err.message);
            } else {
                if (result.length > 0) {
                    res.json({
                        mensagem: "Login feito com sucesso",
                        usuario: result[0]
                    });
                } else {
                    res.json({
                        mensagem: "Email ou senha incorretos"
                    });
                }
            }
        }
    );
});

export { entrarRoute }
