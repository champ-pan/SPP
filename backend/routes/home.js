import express from 'express';
const router = express.Router();
import{ getHome } from '../controller/home.js'; 
router.get('/',getHome);
export default router;