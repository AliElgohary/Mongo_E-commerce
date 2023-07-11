import mongoose from "mongoose";

const ProductShcema = mongoose.Schema({
  name: { type: String, lowercase: true, unique: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model("products", ProductShcema);
