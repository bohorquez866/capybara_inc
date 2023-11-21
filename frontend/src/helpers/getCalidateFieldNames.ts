import { CommonFormProps } from "@/components/Form/form.types";

export const getValidateFieldNames = (fields: CommonFormProps["fields"]) => {
  return fields.map((field) => field.name);
};
