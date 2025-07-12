import express  from 'express';
import cors     from 'cors';
import morgan   from 'morgan';
import dotenv   from 'dotenv';

import connectDB   from './config/db.js';
import parcelRoutes from './routes/parcelRoutes.js'; // ✅ Correct casing
import fareRoutes  from './routes/fareRoutes.js';
import rateRoutes  from './routes/rateRoutes.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const profileRoutes = require('./routes/profileRoutes.cjs');

dotenv.config();
await connectDB();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// ✅ Serve static files (parcel photo uploads)
app.use('/uploads', express.static('uploads'));

app.get('/', (_req, res) => res.send('Go India backend live 🚀'));
app.use('/api/fares', fareRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/rates', rateRoutes); // optional admin endpoints
app.use('/api/profile', profileRoutes);

// 404 and error middleware
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
