import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const products = await Product.findById(req.params.productId);
  res.status(200).json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, imgUrl } = req.body;
  const newProduct = new Product({ name, category, price, imgUrl });
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const updateProductById = async (req: Request, res: Response) => {
  const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
  res.status(200).json(updateProduct);
};

export const deleteProductById = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.status(204).json();
};
