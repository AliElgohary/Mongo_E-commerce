import { Router } from "express";
import {getProducts ,createProduct, deleteProductById, Order } from '../controllers/productsController.js';
import { verifyToken } from "../middleware/auth.js";


export const router = Router();


router.get('/', verifyToken ,getProducts)
router.post('/', verifyToken , createProduct)
router.delete('/' ,verifyToken ,deleteProductById)
router.post('/order/:Userid' ,verifyToken ,Order)