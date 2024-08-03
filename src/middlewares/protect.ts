import { Request, Response, NextFunction } from 'express';

export function protect(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) return next();
  res.status(403).send('Not permitted');
}
