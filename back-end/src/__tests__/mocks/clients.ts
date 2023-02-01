interface IClientRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}
interface IClientLogin {
  email: string;
  password: string;
}

export const client1: IClientRequest = {
  name: "client-1",
  email: "client1@gmail.com",
  phone_number: "69900000000",
  password: "123123",
};

export const client2: IClientRequest = {
  name: "client-2",
  email: "client2@gmail.com",
  phone_number: "69900000001",
  password: "1231234",
};

export const loginClient1: IClientLogin = {
  email: "client1@gmail.com",
  password: "123123",
};

export const loginClient2: IClientLogin = {
  email: "client2@gmail.com",
  password: "1231234",
};
