export interface TaxBracket {
  /**
   * Lowest Applicable Income
   **/
  lowerLimit: number;

  /**
   * Highest Applicable Income
   **/
  upperLimit: number | 'Infinity';

  /**
   * Base tax
   **/
  baseTax: number;

  /**
   * rate added to tax = (taxableIncome - lowerLimit) * adjustmentRate/100
   **/
  adjustmentRate: number;
}

export const DAILY: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 685,
    baseTax: 0,
    adjustmentRate: 0,
  },
  {
    lowerLimit: 685,
    upperLimit: 1095,
    baseTax: 0,
    adjustmentRate: 20,
  },
  {
    lowerLimit: 1096,
    upperLimit: 2191,
    baseTax: 82.19,
    adjustmentRate: 25,
  },
  {
    lowerLimit: 2192,
    upperLimit: 5478,
    baseTax: 356.16,
    adjustmentRate: 30,
  },
  {
    lowerLimit: 5479,
    upperLimit: 21917,
    baseTax: 1342.47,
    adjustmentRate: 32,
  },
  {
    lowerLimit: 21918,
    upperLimit: 'Infinity',
    baseTax: 6602.74,
    adjustmentRate: 35,
  },
];

export const WEEKLY: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 4808,
    baseTax: 0,
    adjustmentRate: 0,
  },
  {
    lowerLimit: 4808,
    upperLimit: 7691,
    baseTax: 0,
    adjustmentRate: 20,
  },
  {
    lowerLimit: 7692,
    upperLimit: 15384,
    baseTax: 576.92,
    adjustmentRate: 25,
  },
  {
    lowerLimit: 15385,
    upperLimit: 38461,
    baseTax: 2500,
    adjustmentRate: 30,
  },
  {
    lowerLimit: 38462,
    upperLimit: 153845,
    baseTax: 9423.08,
    adjustmentRate: 32,
  },
  {
    lowerLimit: 153846,
    upperLimit: 'Infinity',
    baseTax: 46346.15,
    adjustmentRate: 35,
  },
];

export const SEMI_MONTHLY: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 10417,
    baseTax: 0,
    adjustmentRate: 0,
  },
  {
    lowerLimit: 10417,
    upperLimit: 16666,
    baseTax: 0,
    adjustmentRate: 20,
  },
  {
    lowerLimit: 16667,
    upperLimit: 33332,
    baseTax: 1250,
    adjustmentRate: 25,
  },
  {
    lowerLimit: 33333,
    upperLimit: 83332,
    baseTax: 5416.67,
    adjustmentRate: 30,
  },
  {
    lowerLimit: 83333,
    upperLimit: 333332,
    baseTax: 20416.67,
    adjustmentRate: 32,
  },
  {
    lowerLimit: 333333,
    upperLimit: 'Infinity',
    baseTax: 100416.67,
    adjustmentRate: 35,
  },
];

export const MONTHLY: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 20833,
    baseTax: 0,
    adjustmentRate: 0,
  },
  {
    lowerLimit: 20833,
    upperLimit: 33332,
    baseTax: 0,
    adjustmentRate: 20,
  },
  {
    lowerLimit: 33333,
    upperLimit: 66666,
    baseTax: 2500,
    adjustmentRate: 25,
  },
  {
    lowerLimit: 66667,
    upperLimit: 83332,
    baseTax: 10833.33,
    adjustmentRate: 30,
  },
  {
    lowerLimit: 166666,
    upperLimit: 666666,
    baseTax: 40833.33,
    adjustmentRate: 32,
  },
  {
    lowerLimit: 666667,
    upperLimit: 'Infinity',
    baseTax: 200833.33,
    adjustmentRate: 35,
  },
];

export const YEARLY: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 250000,
    baseTax: 0,
    adjustmentRate: 0,
  },
  {
    lowerLimit: 250000,
    upperLimit: 400000,
    baseTax: 0,
    adjustmentRate: 20,
  },
  {
    lowerLimit: 400000,
    upperLimit: 800000,
    baseTax: 30000,
    adjustmentRate: 25,
  },
  {
    lowerLimit: 800000,
    upperLimit: 2000000,
    baseTax: 130000,
    adjustmentRate: 30,
  },
  {
    lowerLimit: 2000000,
    upperLimit: 8000000,
    baseTax: 490000,
    adjustmentRate: 32,
  },
  {
    lowerLimit: 8000000,
    upperLimit: 'Infinity',
    baseTax: 2410000,
    adjustmentRate: 35,
  },
];
