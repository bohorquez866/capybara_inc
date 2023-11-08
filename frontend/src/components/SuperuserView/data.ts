import { Role } from "@/hooks/useRoleAccess";
import { Record } from "./SuperUserView.types";
import { AccountRecord } from "@/context/context.types";

export const users: Record[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    name: "Peter Parker",
    email: "peter.parker@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    name: "Mary Jane Watson",
    email: "mary.jane.watson@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    name: "Bruce Wayne",
    email: "bruce.wayne@example.com",
    password: "password",
    role: Role.ADMIN,
  },
];

export const accountUsers = [
  {
    english_level: "C1",
    role: Role.SUPERUSER,
    email: "bohorquez866@gmail.com",
    cv_url:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "bohorquez866",
    name: "Jesus R. Bohorquez",
    team: "Acme Corporation",
  },

  {
    english_level: "B2",
    role: Role.USER,
    email: "dan124@gmail.com",
    cv_url:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "Dan1997",
    name: "Daniel Smith",
    team: "Acme Corporation",
  },
];

export const accountRecords: AccountRecord[] = [
  {
    accountName: "Acme Corporation",
    clientName: "John Doe",
    operationLeader: "Jane Smith",
    teamConsultation: ["bohorquez866@gmail.com"],
  },
  {
    accountName: "Beta Technologies",
    clientName: "Jane Doe",
    operationLeader: "Peter Jones",
    teamConsultation: [],
  },
  {
    accountName: "Gamma Enterprises",
    clientName: "Peter Jones",
    operationLeader: "Mary Johnson",
    teamConsultation: [],
  },
];
