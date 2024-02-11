import express from 'express';
const router = express.Router();
import{createUser} from '../controller/user.js'; 
router.post('/',createUser);

export default router;