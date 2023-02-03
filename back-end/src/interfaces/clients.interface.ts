import { IContactCreateRequest } from "./contacts.interface";

export interface IClientCreateRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  contacts?: IContactCreateRequest;
}

export interface IClientNoPassword {
  name: string;
  email: string;
  password?: string;
  phone_number: string;
}

export interface ISession {
  email: string;
  password: string;
}
