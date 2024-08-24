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
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId,
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.statics.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    return yield bcrypt.hash(password, salt);
});
userSchema.statics.comparePassword = (password, receivePassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(password, receivePassword);
});
exports.default = model("User", userSchema);
