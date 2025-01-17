import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

function protect(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) return next();
  res.status(403).send('Not permitted');
}

router.get('/login', (req: Request, res: Response) => {
  res.send(`
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
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === 'hi@hi.com' && password === 'pass') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else res.send('Invalid email or password');
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <dev>
        <div>You are loggedIn</div>
        <a href="/logout">Logout</a>
      </div>    
    `);
  } else {
    res.send(`
      <dev>
        <div>You are not loggedIn</div>
        <a href="/login">Login</a>
      </div>    
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', protect, (req: Request, res: Response) => {
  res.send('Welcome to protected route');
});

export { router };
