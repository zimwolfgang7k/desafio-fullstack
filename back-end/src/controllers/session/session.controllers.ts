import { Request, Response } from "express";
import { ISession } from "../../interfaces/clients.interface";
import { ClientSessionService } from "../../services/session/session.services";

export class ClientSessionController {
  static async clientSession(req: Request, res: Response) {
    const session: ISession = req.body;

    const token = await ClientSessionService.clientSession(session);

    return res.status(200).json({ token });
  }
}
