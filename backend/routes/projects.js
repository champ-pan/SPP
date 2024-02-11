import express from "express";
const router = express.Router();
import{ getProjects } from '../controller/projects.js'; 
router.post('/',getProjects);
export default router;