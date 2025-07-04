export const calcTotal = (rate, distanceKm, durationMin) => {
  // Minimal‑fare shortcut
  if (distanceKm < rate.minDistanceKm) return rate.minFare;

  const kmCharge   = Math.max(0, distanceKm - rate.baseFareDistanceKm) * rate.perKm;
  const timeCharge = durationMin * rate.perMin;
  const subTotal   = rate.baseFare + kmCharge + timeCharge;
  const platform   = (rate.platformFeePercent / 100) * subTotal;
  const gst        = (rate.gstPercent / 100) * subTotal;

  return Number((subTotal + platform + gst).toFixed(2));
};
