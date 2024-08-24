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
exports.signin = exports.signup = void 0;
const jwt = require('jsonwebtoken');
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../config"));
const Role_1 = __importDefault(require("../models/Role"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, roles } = req.body;
    const userFound = User_1.default.find({ email });
    const newUser = new User_1.default({
        username,
        email,
        password: yield User_1.default.encryptPassword(password)
    });
    if (roles) {
        const foundRoles = yield Role_1.default.find({ name: { $in: roles } });
        console.log(foundRoles);
        newUser.roles = foundRoles.map((role) => role._id);
    }
    else {
        const role = yield Role_1.default.findOne({ name: 'user' });
        newUser.roles = [role._id];
    }
    const savedUser = yield newUser.save();
    console.log(savedUser);
    const token = jwt.sign({ id: savedUser._id }, config_1.default.SECRET, { expiresIn: 100000 });
    res.json(token);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_1.default.findOne({ email: req.body.email }).populate("roles");
    if (!userFound)
        return res.status(400).json({ message: "User not found" });
    const matchPassword = yield User_1.default.comparePassword(req.body.password, userFound.password);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: "Invalid password" });
    const token = jwt.sign({ id: userFound._id }, config_1.default.SECRET, { expiresIn: 100000 });
    res.json({ token });
});
exports.signin = signin;
