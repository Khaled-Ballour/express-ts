import { Request, Response } from 'express';
import { controller, use, get, post, req } from './decorators';
import { bodyValidator } from '../middlewares';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin() {
    return `
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `;
  }

  @post('/login')
  @use(bodyValidator('email', 'password'))
  postLogin(@req() req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'email@login.com' && password === 'pass') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else return 'Invalid email or password';
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
