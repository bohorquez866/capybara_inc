import { AccountRecord } from "../context/context.types";

export interface AccountFormProps {
  isOpen: boolean;
  formTitle: string;
  action: "edit" | "add";
  onCancel: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  record: AccountRecord | null;
}
