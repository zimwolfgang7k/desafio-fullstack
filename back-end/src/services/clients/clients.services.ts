import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entities";
import { AppError } from "../../errors/appError";
import { IClientCreateRequest } from "../../interfaces/clients.interface";
import { IClientNoPassword } from "../../interfaces/clients.interface";
import { Utils } from "../../utils/functions";

export class ClientService {
  static async createClient(
    client: IClientCreateRequest
  ): Promise<IClientNoPassword> {
    const clientRepository = AppDataSource.getRepository(Client);

    const validationDataClient = client.hasOwnProperty(
      "name" && "email" && "phone_number" && "password"
    );

    if (!validationDataClient) {
      throw new AppError("There is missing camps", 400);
    }

    const findClientName = await clientRepository.findOneBy({
      name: client.name,
    });

    const findClientEmail = await clientRepository.findOneBy({
      email: client.email,
    });

    if (findClientEmail) {
      throw new AppError("This email is already being used", 409);
    }
    if (findClientName) {
      throw new AppError("This name is already being used", 409);
    }

    const hashedPassword = await hash(client.password, 10);

    const clientCreated = clientRepository.create({
      name: client.name,
      email: client.email,
      phone_number: client.phone_number,
      password: hashedPassword,
    });

    await clientRepository.save(clientCreated);

    const clientCreatedNoPassword = Utils.removePassword(clientCreated);

    return clientCreatedNoPassword;
  }
  static async getClients(): Promise<IClientNoPassword[]> {
    const clientRepository = AppDataSource.getRepository(Client);

    const clients = clientRepository.find();

    return clients;
  }
  static async deleteClient(id: string): Promise<void> {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = clientRepository.findOneBy({ id: id });

    await clientRepository.delete(id);
  }
  static async updateClient(
    id: string,
    clientData: IClientCreateRequest
  ): Promise<IClientNoPassword> {
    const clientRepository = AppDataSource.getRepository(Client);

    const { name, email, password, phone_number } = clientData;

    const clients = await clientRepository.find();

    const client = clients.find((client) => client.id === id);

    if (!client) {
      throw new AppError("Client not found", 400);
    }

    const clientId = client?.id;

    await clientRepository.update(clientId!, {
      name: name ? name : client.name,
      email: email ? email : client.email,
      password: password ? await hash(password, 10) : client.password,
      phone_number: phone_number ? phone_number : client.phone_number,
    });
    const clientUpdated = await clientRepository.findOneBy({
      id: clientId,
    });

    return clientUpdated!;
  }
}
