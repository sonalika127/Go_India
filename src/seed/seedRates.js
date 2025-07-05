import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Rate from '../models/Rate.js';

await connectDB();

const base = {
  state: 'telangana',
  city: 'hyderabad',
  baseFareDistanceKm: 2,
  perMin: 1,
  platformFeePercent: 3,
  gstPercent: 5,
  minDistanceKm: 2,
};

const data = [
  { ...base, vehicleType: 'Bike',   baseFare: 25, perKm: 6,  minFare: 25 },
  { ...base, vehicleType: 'Auto',   baseFare: 30, perKm: 8,  minFare: 35 },
  { ...base, vehicleType: 'Car',    baseFare: 40, perKm: 12, minFare: 50 },   // ✅ New
  { ...base, vehicleType: 'prime',  baseFare: 50, perKm: 15, minFare: 60 },   // ✅ New
  { ...base, vehicleType: 'parcel', baseFare: 20, perKm: 10, minFare: 30 },   // ✅ New
];

await Rate.deleteMany({ state: 'telangana', city: 'hyderabad' });
await Rate.insertMany(data);

console.log('✔ Seeded Hyderabad (Telangana) fare rates');
await mongoose.disconnect();
process.exit();
