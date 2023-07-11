import { Router } from "express";
import { createUser, login , getUers} from '../controllers/usresController.js';




export const router = Router();
//create a new user
router.post('/register', createUser)
//login to an existing user
router.post('/login', login)
//get all the users
router.get('/', getUers)