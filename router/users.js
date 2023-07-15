import { Router } from "express";
import { createUser, login , getUers} from '../controllers/usresController.js';




export const router = Router();

router.post('/register', createUser)
router.post('/login', login)
router.get('/', getUers)
