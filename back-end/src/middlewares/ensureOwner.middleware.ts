import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureOwner = async (req: Request, res: Response, next: NextFunction) => {
  const idLogin = req.client.id;
  const { id } = req.params;

  if (id !== idLogin) {
    throw new AppError("Client is not the owner of this resource", 403);
  }
  return next();
};

export default ensureOwner;
