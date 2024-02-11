import express from "express";
const router = express.Router();
import{ getContributors } from '../controller/contributors.js'; 
router.post('/',getContributors);
export default router;