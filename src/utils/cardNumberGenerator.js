const generateCheckDigit = (number) => {
  let sum = 0;
  const reverseDigits = number.toString().split("").reverse();
  for (let i = 0; i < reverseDigits.length; i++) {
    let digit = parseInt(reverseDigits[i]);
    // Double every second digit
    if (i % 2 === 1) {
      digit *= 2;

      // If double digit is greater than 9, subtract 9
      if (digit > 9) {
        digit -= 9;
      }
    }
    // Add digit to sum
    sum += digit;
  }

  // Calculate check digit
  const checkDigit = (10 - (sum % 10)) % 10;
  // If check digit is 10, return 0
  if (checkDigit === 10) {
    return 0;
  }
  return checkDigit;
};

const generateFarmerCardNumber = () => {
  const BIN = "920"; // Bank Identification Number
  const TYPE = "01"; // Card Type 1 for Farmer
  const uniqueID = Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString(); // Unique ID
  const cardWithoutCheckDigit = `${BIN}${TYPE}${uniqueID}`; // Card number without check digit
  const checkDigit = generateCheckDigit(cardWithoutCheckDigit);
  const cardNumber = `${cardWithoutCheckDigit}${checkDigit}`; // Card number with check digit
  return cardNumber;
};

module.exports = { generateFarmerCardNumber };
