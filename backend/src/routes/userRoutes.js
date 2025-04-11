import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers); // /users

export default router;
