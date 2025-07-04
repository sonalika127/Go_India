import { Router } from 'express';
import { calculateFare } from '../controllers/fareController.js';

const router = Router();
router.post('/calculate', calculateFare);
export default router;
