import { AccountRecord } from "../../../context/context.types";

export interface AccountFormProps {
  isOpen: boolean;
  action: "edit" | "add";
  onCancel: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  record: AccountRecord | null;
}
