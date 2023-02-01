import express from "express";
import clientRoutes from "./routes/clients.routes";
import contactsRoutes from "./routes/contacts.routes";

const app = express();

app.use(express.json);

app.use("/clients", clientRoutes);
app.use("/contacts", contactsRoutes);

export default app;
