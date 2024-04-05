export function formatNumberWithTwoDecimals(numberString: string): string {
  const number = parseFloat(numberString);

  if (isNaN(number)) {
    return numberString;
  }

  const formattedNumber = number.toFixed(2);

  return formattedNumber;
}
