import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Rate from '../models/Rate.js';

dotenv.config();
await connectDB();

const base = {
  state: 'telangana',
  city : 'hyderabad',
  baseFareDistanceKm: 2,
  perMin: 1,
  platformFeePercent: 3,
  gstPercent: 5,
  minDistanceKm: 2
};

const data = [
  { ...base, vehicleType: 'Bike',   baseFare: 25, perKm: 6,  minFare: 25 },
  { ...base, vehicleType: 'Auto',   baseFare: 30, perKm: 8,  minFare: 35 },
  { ...base, vehicleType: 'Car AC', baseFare: 40, perKm: 12, minFare: 50 },
  { ...base, vehicleType: 'Car XL', baseFare: 50, perKm: 15, minFare: 60 },
];

await Rate.deleteMany({ state: 'telangana', city: 'hyderabad' });
await Rate.insertMany(data);

console.log('✔ Seeded Hyderabad (Telangana) fare rates');
await mongoose.disconnect();
process.exit();
