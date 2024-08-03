import { Request, Response, NextFunction, RequestHandler } from 'express';

export function bodyValidator(...keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(402).send('Bad Request');
    keys.forEach((key) => {
      if (!req.body[key])
        return res.status(402).send(`Messing property: ${key}`);
    });
    next();
  };
}
