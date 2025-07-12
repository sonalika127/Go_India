import express from 'express';
import multer from 'multer';
import { createParcel, estimateParcel } from '../controllers/parcelController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/estimate', estimateParcel);
router.post('/create', upload.single('photo'), createParcel); // <- this must match!

export default router;
