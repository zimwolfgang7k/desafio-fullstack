import AppDataSource from "../../../data-source";
import Request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { contact1 } from "../../mocks/contacts";
import { client1, loginClient1 } from "../../mocks/clients";

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

  it("POST /contacts -> should create a contact", async () => {
    await Request(app).post("/clients").send(client1);
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);

    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;

    const clientsResponse = await Request(app)
      .get("/clients")
      .set("Authorization", tokenClient1);

    const clients = clientsResponse.body;

    const newContact = {
      ...contact1,
      clientId: clients[0].id,
    };

    const response = await Request(app)
      .post("/contacts")
      .set("Authorization", tokenClient1)
      .send(newContact);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone_number");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Duda");
    expect(response.body.email).toEqual("duda@gmail.com");
    expect(response.status).toBe(201);
  });

  it("GET /contacts/:id: -> should get a contact info", async () => {
    await Request(app).post("/clients").send(client1);
    const responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    const tokenClient1 = `Bearer ${responseLoginClient1.body.token}`;

    const responseContacts = await Request(app)
      .get("/contacts")
      .set("Authorization", tokenClient1);

    const contactsDb = responseContacts.body;
    console.log(contactsDb);

    const response = await Request(app)
      .get(`/contacts/${contactsDb[0].id}`)
      .set("Authorization", tokenClient1);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Duda");
  });
  it("PATCH /contacts/:id: -> should update a contact", async () => {
    await Request(app).post("/clients").send(client1);
    let responseLoginClient1 = await Request(app)
      .post("/login")
      .send(loginClient1);
    let tokenClient1 = `Barear ${responseLoginClient1.body.token}`;

    const responseContacts = await Request(app)
      .get("/contacts")
      .set("Authorization", tokenClient1);

    const contactsDb = responseContacts.body;

    const response = await Request(app)
      .patch(`/contacts/${contactsDb[0].id}`)
      .set("Authorization", tokenClient1)
      .send({ name: "Duda teste" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Duda teste");
  });
  it("DELETE /contacts/:id: -> should delete a contact", async () => {
    await Request(app).post("/clients").send(client1);
    const loginResponse = await Request(app).post("/login").send(loginClient1);
    const clientTobeDeleted = await Request(app)
      .get("/clients")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await Request(app).delete(
      `/clients/${clientTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(204);
  });
});
