import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const mockUser = {
  username: 'admin',
  password: 'senha123',
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({message: "autenticado"}, secretKey!, { expiresIn: 60 });
  res.json({ token });
};


