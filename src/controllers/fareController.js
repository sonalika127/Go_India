import Rate from '../models/Rate.js';
import { calcTotal } from '../utils/fareCalc.js';

export const calculateFare = async (req, res, next) => {
  try {
    const { state, city, vehicleType, distanceKm, durationMin } = req.body;

    if (!state || !city || !vehicleType || distanceKm == null || durationMin == null) {
      return res.status(400).json({ message: 'state, city, vehicleType, distanceKm, durationMin are required' });
    }

    const rate = await Rate.findOne({ state: state.toLowerCase(), city: city.toLowerCase(), vehicleType });

    if (!rate) {
      return res.status(404).json({ message: 'Rate not configured for this location/vehicle' });
    }

    const total = calcTotal(rate, Number(distanceKm), Number(durationMin));

    res.json({ total, breakdown: { distanceKm, durationMin, ...rate.toObject() } });
  } catch (err) {
    next(err);
  }
};
