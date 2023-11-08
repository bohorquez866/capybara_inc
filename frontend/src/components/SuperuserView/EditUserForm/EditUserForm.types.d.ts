import { Record } from "../SuperUserView.types";

export interface EditUserFormProps {
  isOpen: boolean;
  onCancel: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  record: Record | null;
}
