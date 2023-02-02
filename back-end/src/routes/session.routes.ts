import { Router } from "express";
import { ClientSessionController } from "../controllers/session/session.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const sessionRoutes = Router();

sessionRoutes.post("", ClientSessionController.clientSession);

export default sessionRoutes;
