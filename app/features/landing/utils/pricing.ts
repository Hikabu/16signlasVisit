export function calculateRoi(hiresPerYear: number) {
  const misHireCost = 140_000;
  const annualProduct = 799 * 12;
  const exposure = hiresPerYear * misHireCost * 0.15;
  const breakeven = (annualProduct / misHireCost).toFixed(2);

  return { annualProduct, breakeven, exposure, misHireCost };
}
