import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  state: { type: String, required: true, lowercase: true, trim: true },
  city:  { type: String, required: true, lowercase: true, trim: true },
  vehicleType: { type: String, required: true, trim: true },

  baseFare:            { type: Number, required: true }, // ₹
  baseFareDistanceKm:  { type: Number, required: true }, // km included in base
  perKm:               { type: Number, required: true }, // ₹ / km beyond base
  perMin:              { type: Number, required: true }, // ₹ / minute
  platformFeePercent:  { type: Number, default: 9 },     // % of subtotal
  gstPercent:          { type: Number, default: 5 },     // fixed 5 %
  minDistanceKm:       { type: Number, default: 2 },
  minFare:             { type: Number, required: true }  // minimal fare
}, { timestamps: true });

rateSchema.index({ state:1, city:1, vehicleType:1 }, { unique: true });

export default mongoose.model('Rate', rateSchema);
