"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRolesExisted = exports.checkDuplicateUsernameOrEmail = void 0;
const Role_1 = require("../models/Role");
const User_1 = __importDefault(require("../models/User"));
const checkDuplicateUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.body.username });
    if (user)
        return res.status(400).json({ message: "The user already exists" });
    const email = yield User_1.default.findOne({ email: req.body.email });
    if (email)
        return res.status(400).json({ message: "The email already exists" });
    next();
});
exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Role_1.ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ message: `Role ${req.body.roles[i]} does not exists` });
            }
        }
    }
    next();
};
exports.checkRolesExisted = checkRolesExisted;
