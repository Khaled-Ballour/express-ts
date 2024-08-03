import { Request, Response, NextFunction, RequestHandler } from 'express';

export function getHandler(desc: PropertyDescriptor): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    res.send(desc.value(req, res));
  };
}
