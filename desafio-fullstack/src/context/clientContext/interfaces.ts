export interface ClientData {
  email: string;
  name: string;
  id: string;
  phone_number: string;
  createdAt: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  phone_number: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
