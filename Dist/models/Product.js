"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = model("Product", productSchema);
