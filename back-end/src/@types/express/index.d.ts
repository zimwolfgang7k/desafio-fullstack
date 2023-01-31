import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      client: {
        name?: boolean;
        id?: string;
        email?: string;
        hotel?: string;
      };
    }
  }
}
