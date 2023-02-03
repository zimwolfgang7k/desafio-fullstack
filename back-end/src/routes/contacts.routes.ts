import { Router } from "express";
import { ContactController } from "../controllers/contacts/contacts.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactsRoutes = Router();

contactsRoutes.post("", ensureAuthMiddleware, ContactController.createContact);
contactsRoutes.get("", ensureAuthMiddleware, ContactController.getContacts);
contactsRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ContactController.getContactsFromAClient
);
contactsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ContactController.updateContact
);
contactsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ContactController.deleteContact
);

export default contactsRoutes;
