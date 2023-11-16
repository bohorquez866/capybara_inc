import { Role } from "@/hooks/useRoleAccess";
import { Record, UserData } from "./SuperUserView.types";
import { AccountRecord } from "@/context/context.types";
import { v4 as uuidv4 } from "uuid";

export const users: Record[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
    role: Role.ADMIN,
  },

  {
    id: uuidv4(),
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password",
    role: Role.USER,
  },
  {
    id: uuidv4(),
    name: "Peter Parker",
    email: "peter.parker@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    id: uuidv4(),
    name: "Mary Jane Watson",
    email: "mary.jane.watson@example.com",
    password: "password",
    role: Role.ADMIN,
  },
  {
    id: uuidv4(),
    name: "Bruce Wayne",
    email: "bruce.wayne@example.com",
    password: "password",
    role: Role.ADMIN,
  },
];

export const accountUsers: UserData[] = [
  {
    english_level: "C",
    role: Role.ADMIN,
    email: "bohorquez866@gmail.com",
    cv_url:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "bohorquez866",
    name: "Jesus R. Bohorquez",
    team: [],
  },

  {
    english_level: "B2",
    role: Role.USER,
    email: "dan124@gmail.com",
    cv_url:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "Dan1997",
    name: "Daniel Smith",
    team: [],
  },
];

export const accountRecords: AccountRecord[] = [
  {
    accountName: "Acme Corporation",
    clientName: "John Doe",
    operationLeader: "Jane Smith",
    teamConsultation: [{ email: "bohorquez866@gmail.com" }],
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
