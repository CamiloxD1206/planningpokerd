import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET, { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("Error al generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
}

export default createAccessToken;