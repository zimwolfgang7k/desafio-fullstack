import Client from "../entities/clients.entities";
import { IClientNoPassword } from "../interfaces/clients.interface";

export class Utils {
  static removePassword(client: Client): IClientNoPassword {
    const clientNoPassword: IClientNoPassword = {
      ...client,
    } as IClientNoPassword;
    delete clientNoPassword.password;
    return clientNoPassword;
  }
}
