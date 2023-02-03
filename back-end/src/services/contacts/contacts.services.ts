import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entities";
import Contacts from "../../entities/contacts.entities";
import { AppError } from "../../errors/appError";
import { Utils } from "../../utils/functions";
import { IContactCreateRequest } from "../../interfaces/contacts.interface";

export class ContactsService {
  static async createContact(data: IContactCreateRequest): Promise<Contacts> {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const clientRepository = AppDataSource.getRepository(Client);

    if (!data.email || !data.name || !data.phone_number || !data.clientId) {
      throw new AppError("There is missing camps", 400);
    }

    const findClientName = await clientRepository.findOneBy({
      name: data.name,
    });

    const findClientEmail = await clientRepository.findOneBy({
      email: data.email,
    });

    if (findClientEmail) {
      throw new AppError("This email is already being used", 409);
    }
    if (findClientName) {
      throw new AppError("This name is already being used", 409);
    }

    const client = await clientRepository.findOneBy({ id: data.clientId });
    if (!client) {
      throw new AppError("Client not found", 400);
    }

    const clientWithoutPassword = Utils.removePassword(client);

    const newContact = contactRepository.create({
      name: data.name,
      client: clientWithoutPassword,
      email: data.email,
      phone_number: data.phone_number,
    });

    await contactRepository.save(newContact);

    return newContact;
  }
  static async getContactsFromAClient(id: string): Promise<Contacts[]> {
    const contactRepository = AppDataSource.getRepository(Contacts);

    const contacts = contactRepository.findBy({
      client: {
        id: id,
      },
    });

    return contacts;
  }
  static async getContacts(): Promise<Contacts[]> {
    const contactRepository = AppDataSource.getRepository(Contacts);

    const contacts = contactRepository.find();

    return contacts;
  }
  static async deleteContact(id: string): Promise<void> {
    const contactRepository = AppDataSource.getRepository(Contacts);

    const contacts = await contactRepository.find();

    const contact = contacts.find((Contact) => Contact.id === id);

    if (!contact) {
      throw new AppError("Contact not found", 400);
    }

    await contactRepository.delete(id);
  }
  static async updateContact(
    id: string,
    contactData: IContactCreateRequest
  ): Promise<Contacts> {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const clientRepository = AppDataSource.getRepository(Client);

    const { name, email, phone_number } = contactData;

    const contacts = await contactRepository.find();

    const contact = contacts.find((Contact) => Contact.id === id);

    if (!contact) {
      throw new AppError("Contact not found", 400);
    }

    const contactId = contact?.id;

    await contactRepository.update(contactId!, {
      name: name ? name : contact.name,
      email: email ? email : contact.email,
      phone_number: phone_number ? phone_number : contact.phone_number,
    });
    const contactUpdated = await contactRepository.findOneBy({
      id: contactId,
    });

    return contactUpdated!;
  }
}
