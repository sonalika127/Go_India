import { Router } from 'express';
import { upsertRate, listRates } from '../controllers/rateController.js';

const router = Router();
router.get('/:state', listRates); // list all rates for a state
router.post('/', upsertRate);     // add/update a single rate
export default router;
