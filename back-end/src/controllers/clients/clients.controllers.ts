import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IClientCreateRequest } from "../../interfaces/clients.interface";
import { ClientService } from "../../services/clients/clients.services";

export class ClientController {
  static async createClient(req: Request, res: Response) {
    const client: IClientCreateRequest = req.body;

    const clientCreated = await ClientService.createClient(client);

    return res.status(201).json(instanceToPlain(clientCreated));
  }
  static async getClients(req: Request, res: Response) {
    const clients = await ClientService.getClients();
    return res.json(instanceToPlain(clients));
  }
  static async deleteClient(req: Request, res: Response) {
    const clientId = req.params.id;
    await ClientService.deleteClient(clientId);
    return res.status(204).json({ message: "client deleted succesfully!" });
  }
  static async updateClient(req: Request, res: Response) {
    const clientId = req.params.id;
    const updatedClientData = req.body;
    const updatedClient = await ClientService.updateClient(
      clientId,
      updatedClientData
    );
    return res.status(200).json(instanceToPlain(updatedClient));
  }
  static async retrieveClient(req: Request, res: Response) {
    const clientId = req.params.id;
    const client = await ClientService.retrieveClient(clientId);

    return res.status(200).json(instanceToPlain(client));
  }
}
