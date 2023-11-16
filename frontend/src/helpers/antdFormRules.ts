import { Rule } from "antd/es/form";
import { passwordRegex } from "./regex";

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

export { emailInputRules, requiredInputRules, passwordInputRules };
