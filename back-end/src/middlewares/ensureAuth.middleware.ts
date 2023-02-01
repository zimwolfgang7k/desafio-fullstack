import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) throw new AppError("Authorization token is missing!", 400);

  token = token.split(" ")[1];

  jwt.verify(token, String(process.env.SECRET_KEY), (error) => {
    if (error) throw new AppError("Invalid token", 401);

    return next();
  });
};

export default ensureAuthMiddleware;
