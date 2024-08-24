/** Inicio de aplicacion */

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import "./database";

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on port http:localhost:${port}`));
