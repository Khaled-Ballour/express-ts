import { Request, Response, NextFunction } from 'express';
import { use, get, controller } from './decorators';

function protect(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) return next();
  res.status(403).send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getIndex(req: Request, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`
        <dev>
          <div>You are loggedIn</div>
          <a href="/auth/logout">Logout</a>
        </div>    
      `);
    } else {
      res.send(`
        <dev>
          <div>You are not loggedIn</div>
          <a href="/auth/login">Login</a>
        </div>    
      `);
    }
  }

  @get('/protected')
  @use(protect)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route');
  }
}
