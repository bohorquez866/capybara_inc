import { Record } from "../SuperuserView/SuperUserView.types";

export interface UserFormProps {
  isOpen: boolean;
  action: "edit" | "add";
  onCancel: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  record: Record | null;
  formTitle: string;
}
