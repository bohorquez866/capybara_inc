import { generatePassword } from "../generatePassword";

describe("generatePassword", () => {
  it("should generate a password with the specified length", () => {
    const password = generatePassword(16);
    expect(password.length).toBe(16);
  });

  it("should generate a password with at least one uppercase letter", () => {
    const password = generatePassword();
    const uppercaseLetters = /[A-Z]/;
    expect(uppercaseLetters.test(password)).toBe(true);
  });

  it("should generate a password with at least one lowercase letter", () => {
    const password = generatePassword();
    const lowercaseLetters = /[a-z]/;
    expect(lowercaseLetters.test(password)).toBe(true);
  });

  it("should generate a password with at least one number", () => {
    const password = generatePassword();
    const numbers = /[0-9]/;
    expect(numbers.test(password)).toBe(true);
  });

  it("should generate a password with at least one special character", () => {
    const password = generatePassword();
    const specialCharacter = /[!@#$%^&*()-_+={}[]|:]/;
    expect(specialCharacter.test(password)).toBe(true);
  });
});
