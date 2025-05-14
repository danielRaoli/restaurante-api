import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido' });
      return;
    }

    next();
  });
};