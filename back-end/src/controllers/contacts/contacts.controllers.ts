import { Response, Request } from "express";
import { IContactCreateRequest } from "../../interfaces/contacts.interface";
import { ContactsService } from "../../services/contacts/contacts.services";

export class ContactController {
  static async createContact(req: Request, res: Response) {
    const contact: IContactCreateRequest = req.body;

    const contactCreated = await ContactsService.createContact(contact);
    console.log(contactCreated);

    return res.status(201).json(contactCreated);
  }
  static async getContactsFromAClient(req: Request, res: Response) {
    const contactId = req.params.id;
    const clients = await ContactsService.getContactsFromAClient(contactId);

    return res.status(200).json(clients);
  }
  static async getContacts(req: Request, res: Response) {
    const contacts = await ContactsService.getContacts();

    return res.status(200).json(contacts);
  }
  static async updateContact(req: Request, res: Response) {
    const contactId = req.params.id;
    const updatedContactData = req.body;
    const updatedContact = await ContactsService.updateContact(
      contactId,
      updatedContactData
    );
    return res.status(200).json(updatedContact);
  }
  static async deleteContact(req: Request, res: Response) {
    const contactId = req.params.id;
    await ContactsService.deleteContact(contactId);
    return res.status(204).json({ message: "contact deleted succesfully!" });
  }
}
