import { Router } from "express";
import { ClientController } from "../controllers/clients/clients.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureOwner from "../middlewares/ensureOwner.middleware";

const clientRoutes = Router();

clientRoutes.post("", ClientController.createClient);
clientRoutes.get("", ensureAuthMiddleware, ClientController.getClients);
clientRoutes.get(
  "/profile/:id",
  ensureAuthMiddleware,
  ensureOwner,
  ClientController.retrieveClient
);
clientRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureOwner,
  ClientController.deleteClient
);
clientRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOwner,
  ClientController.updateClient
);

export default clientRoutes;
