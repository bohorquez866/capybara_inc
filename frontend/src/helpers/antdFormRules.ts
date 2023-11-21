import { Rule } from "antd/es/form";
import { GdriveRegex, passwordRegex } from "./regex";

const emailInputRules: Rule[] = [
  { type: "email", message: "Please enter a valid email address" },
  { required: true, message: "Please enter an email address" },
];

const requiredInputRules: Rule[] = [
  { required: true, message: "Field is required" },
];

const passwordInputRules: Rule[] = [
  {
    pattern: passwordRegex,
    message:
      "sorry, but the password must have at least one uppercase, number and special characte",
  },
];

export const minDateInputRules: Rule[] = [
  {
    type: "date",
    message: "Please select a date after today",
    validator: (rule, value) => {
      if (value < new Date(-1)) {
        return Promise.reject("Please select a date after today");
      }
      return Promise.resolve();
    },
  },
];

export const driveUrlInputRules: Rule[] = [
  {
    pattern: GdriveRegex,
    message: "Link to CV must be a Google Drive link",
  },
];

export { emailInputRules, requiredInputRules, passwordInputRules };
