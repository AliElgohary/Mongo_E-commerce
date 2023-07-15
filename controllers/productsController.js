import mongoose from "mongoose";
import { Product } from "../schemas/product.js";
import { User } from "../schemas/user.js";
import { json } from "express";

export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.send(products);
};

export const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = new Product({
      name: body.name,
      price: body.price,
    });
    const data = await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Category name must be at least 4 characters" });
  }
};

export const deleteProductById = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const result = await Product.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: `Product with ID ${_id} not found` });
    }
    return res
      .status(200)
      .json({ message: `Product with ID ${_id} deleted successfully` });
  } catch (error) {
    console.error(`Error deleting product with ID ${_id}: ${error}`);
    return res
      .status(500)
      .json({ error: `Error deleting product with ID ${_id}` });
  }
};

export const Order = async (req, res, next) => {
  const _id = req.params.Userid;
  const productData = req.body;

  const existingProduct = await Product.findOne({ _id: productData._id });
  if (existingProduct) {
    const filter = { _id: _id };
    const user = await User.findOne(filter);
    user.products.push(productData._id);
    await user.save();
    res.send(user);
  }
};