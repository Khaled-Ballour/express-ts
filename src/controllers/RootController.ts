import { Request } from 'express';
import { use, get, req, controller } from './decorators';
import { protect } from '../middlewares';

@controller('')
class RootController {
  @get('/')
  getIndex(@req() req: Request): string {
    if (req.session?.loggedIn) {
      return `
        <dev>
          <div>You are loggedIn</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `;
    } else {
      return `
        <dev>
          <div>You are not loggedIn</div>
          <a href="/auth/login">Login</a>
        </div>
      `;
    }
  }

  @get('/protected')
  @use(protect)
  getProtected(): string {
    return 'Welcome to protected route';
  }
}
