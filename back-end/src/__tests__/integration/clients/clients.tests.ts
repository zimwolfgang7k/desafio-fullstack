import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import Request from "supertest";
import app from "../../../app";
import { client1 } from "../../mocks/clients";

describe("/clients", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });
});

it("/POST should create an client", async () => {
  const response = await Request(app).post("/client").send(client1);

  expect(response.body).toHaveProperty("id");
  expect(response.body).toHaveProperty("name");
  expect(response.body).toHaveProperty("email");
  expect(response.body).toHaveProperty("telephone");
  expect(response.body).toHaveProperty("createdAt");
  expect(response.body).not.toHaveProperty("password");
  expect(response.body.name).toEqual("client-1");
  expect(response.body.email).toEqual("client1@gmail.com");
  expect(response.status).toBe(201);
});
