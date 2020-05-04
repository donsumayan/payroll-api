// source: https://filipiknow.net/philhealth-contribution/

export interface PhilHealthBracket {
  lowerLimit: number;
  upperLimit: number | 'Infinity';
  monthlyPremium: number;
  rate: number;
  fixedContribution: number;
}

export const PHILHEALTH_CONTRIBUTION_TABLE: PhilHealthBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 10000,
    monthlyPremium: 300,
    rate: 0,
    fixedContribution: 300,
  },
  {
    lowerLimit: 10000,
    upperLimit: 60000,
    monthlyPremium: 275,
    rate: 3,
    fixedContribution: 0,
  },
  {
    lowerLimit: 60000,
    upperLimit: 'Infinity',
    monthlyPremium: 1100,
    rate: 0,
    fixedContribution: 1800,
  },
];
