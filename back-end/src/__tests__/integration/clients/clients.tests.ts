import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import Request from "supertest";
import app from "../../../app";
import {
  client1,
  client2,
  loginClient1,
  loginClient2,
} from "../../mocks/clients";
import { contact1 } from "../../mocks/contacts";

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

  it("POST /clients -> should create an client", async () => {
    const response = await Request(app).post("/clients").send(client1);

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

  it("POST /clients -> should not create if email already exists", async () => {
    const response = await Request(app).post("/clients").send(client1);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /clients -> should not create if name already exists", async () => {
    const response = await Request(app).post("/user").send(client1);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /login -> should login", async () => {
    const response = await Request(app).post("/login").send(loginClient1);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("GET /clients/ -> should be able to list all clients", async () => {
    await Request(app).post("/contacts").send(client1);
    const loginResponse = await Request(app).post("/login").send(loginClient1);
    const response = await Request(app)
      .get("/clients")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  it("PATCH /clients/:id: -> should update a client", async () => {
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;

    const ClientDataBaseResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    const response = await Request(app)
      .patch(`/clients/${ClientDataBaseResponse.body[0].id}`)
      .set("Authorization", tokenClient1)
      .send({ name: "Jose Henrique" });

    const ClientUpdateResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    expect(response.status).toBe(200);
    expect(ClientUpdateResponse.body[0].name).toBe("Jose Henrique");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toBe("Jose Henrique");
  });
  it("PATCH /clients/:id: -> Should not update another client ", async () => {
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;
    const ClientDataBaseResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    await Request(app).post("/clients").send(client2);
    const responseLoginClient2 = await Request(app)
      .post("/login")
      .send(loginClient2);
    const token = `Bearer ${responseLoginClient2.body.token}`;

    const response = await Request(app)
      .patch(`/clients/${ClientDataBaseResponse.body[0].id}`)
      .set("Authorization", token)
      .send({ name: "Joao" });

    const ClientUpdatedResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(ClientUpdatedResponse.body[0].name).not.toBe("Joao");
  });
  it("DELETE /clients/:id: -> Should delete a client", async () => {
    const responseLogin = await Request(app).post("/login").send(loginClient1);
    const tokenClient1 = `Bearer ${responseLogin.body.token}`;

    const ClientDataBaseResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    const response = await Request(app)
      .delete(`/clients/${ClientDataBaseResponse.body[1].id}`)
      .set("Authorization", tokenClient1);

    const UserUpdateResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    expect(UserUpdateResponse.body[1].isActive).toBe(false);

    expect(response.status).toBe(204);
  });

  it("DELETE /clients/:id: -> Should not delete another client", async () => {
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;

    const responseLoginClient2 = await Request(app)
      .post("/login")
      .send(loginClient2);
    const tokenClient2 = `Bearer ${responseLoginClient2.body.token}`;

    const ClientDataBaseResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    const response = await Request(app)
      .delete(`/clients/${ClientDataBaseResponse.body[0].id}`)
      .set("Authorization", tokenClient2);

    const UserUpdateResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    expect(UserUpdateResponse.body[1].isActive).toBe(false);

    expect(response.status).toBe(403);
  });
  it("GET /clients/profile -> Should show a client data", async () => {
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    const tokenClient1 = `Barear ${responseLoginClient1.body.token}`;

    const UserDataBaseResponse = await Request(app)
      .get("/clients")
      .set("authorization", tokenClient1);

    const response = await Request(app)
      .get(`/clients/profile`)
      .set("Authorization", tokenClient1);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(UserDataBaseResponse.body[0].id);
  });
  it("/GET /user/:id/contacts Should show client contacts", async () => {
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(client1);
    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;
    // const responseLogin = await Request(app).post("/login").send(client2);
    // const tokenClient2 = `Bearer ${responseLogin.body.token}`;

    await Request(app)
      .post("/contacts")
      .send(contact1)
      .set("Authorization", tokenClient1);

    const contactsResponse = await Request(app)
      .get("/contacts")
      .set("Authorization", tokenClient1);

    const contacts = contactsResponse.body;
    const clientResponse = await Request(app)
      .get("/clients/profile")
      .set("Authorization", tokenClient1);

    const client = clientResponse.body;

    const newPet = {
      ...contact1,
      client_id: client.id,
    };

    await Request(app)
      .post("/contacts")
      .set("Authorization", tokenClient1)
      .send(newPet);

    const response = await Request(app)
      .get(`/user/${client.id}/pets`)
      .set("Authorization", tokenClient1);

    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("Duda");
    // expect(response.body.length).toBe();
  });
});
