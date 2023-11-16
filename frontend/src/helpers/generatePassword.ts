export const generatePassword = (length: number = 16): string => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_+={}[]|:";

  const allCharacters = `${upperCaseLetters}${lowerCaseLetters}${numbers}${specialCharacters}`; // Pre-compute allCharacters

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  // Ensure at least one uppercase letter
  if (!password.includes(upperCaseLetters)) {
    password +=
      upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  }

  // Ensure at least one lowercase letter
  if (!password.includes(lowerCaseLetters)) {
    password +=
      lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
  }

  // Ensure at least one number
  if (!password.includes(numbers)) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  // Ensure at least one special character
  if (!password.includes(specialCharacters)) {
    password +=
      specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  }

  return password;
};
