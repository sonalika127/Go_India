import Rate from '../models/Rate.js';

export const upsertRate = async (req, res, next) => {
  try {
    const rate = await Rate.findOneAndUpdate(
      { state: req.body.state.toLowerCase(), city: req.body.city.toLowerCase(), vehicleType: req.body.vehicleType },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(rate);
  } catch (err) { next(err); }
};

export const listRates = async (req, res, next) => {
  try {
    const rates = await Rate.find({ state: req.params.state.toLowerCase() });
    res.json(rates);
  } catch (err) { next(err); }
};
