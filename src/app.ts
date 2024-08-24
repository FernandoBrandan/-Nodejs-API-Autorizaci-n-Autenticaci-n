/** Inicio de express */
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { createRoles } from "./libs/init";
createRoles();

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routers";
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
