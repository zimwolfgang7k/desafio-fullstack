import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entities";
import { AppError } from "../../errors/appError";
import { ISession } from "../../interfaces/clients.interface";

export class ClientSessionService {
  static async clientSession({ email, password }: ISession): Promise<String> {
    const clientRepository = AppDataSource.getRepository(Client);

    const clientSession = await clientRepository.findOneBy({ email: email });

    if (!clientSession) {
      throw new AppError("Invalid email or password!", 403);
    }

    const comparePassword = await compare(password, clientSession.password);

    if (!comparePassword) {
      throw new AppError("Invalid email or password!", 403);
    }

    const decoded = {
      id: clientSession.id,
      email: clientSession.email,
    };

    const token = jwt.sign(decoded, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
      subject: clientSession.id,
    });

    return token;
  }
}
