import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {router as userRouter} from './router/users.js'
import { router as productRouter } from "./router/products.js";


const app = express();
app.use(json());
dotenv.config();




mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log(`connected to DB`);
  })
  .catch((err) => {
    console.log(err);
  });


  app.use('/users', userRouter)
  app.use('/products', productRouter)


  const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port} `);
});
