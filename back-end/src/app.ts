import "reflect-metadata";
import "express-async-errors";
import express from "express";
import ErrorMiddleware from "./middlewares/handleError.middleware";
import clientRoutes from "./routes/clients.routes";
import contactsRoutes from "./routes/contacts.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/contacts", contactsRoutes);
app.use("/login", sessionRoutes);

app.use(ErrorMiddleware.handle);

export default app;
