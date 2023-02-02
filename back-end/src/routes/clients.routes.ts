import { Router } from "express";
import { ClientController } from "../controllers/clients/clients.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const clientRoutes = Router();

clientRoutes.post("", ClientController.createClient);
clientRoutes.get("", ensureAuthMiddleware, ClientController.getClients);
clientRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ClientController.deleteClient
);
clientRoutes.patch("/:id", ensureAuthMiddleware, ClientController.updateClient);

export default clientRoutes;
