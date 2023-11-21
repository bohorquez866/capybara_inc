import { Rule } from "antd/es/form";
import { Record } from "../SuperuserView/SuperUserView.types";

type submitAction = submitAction;

type SelectOption = {
  label: string;
  value: string;
};
type Field = {
  name: string;
  rules: Rule[];
};

export interface CommonFormProps {
  isOpen: boolean;
  onCancel: () => void;
  record: any;
  action: "add" | "edit";
  formTitle: string;
  fields: Field[];
  initialValues: Record<string, any>;
  selectOptions?: SelectOption[];
  onSubmit: {
    add: submitAction;
    update: submitAction;
  };
}
