"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Inicio de express */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const init_1 = require("./libs/init");
(0, init_1.createRoles)();
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routers_1 = __importDefault(require("./routes/user.routers"));
app.use("/api/products", products_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routers_1.default);
exports.default = app;
