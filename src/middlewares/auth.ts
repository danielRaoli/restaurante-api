import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido!' });
    return;
  }

  jwt.verify(token, "UDIUS@!$%!@%$#@#IDSIUADSA*&D(*SA&(D*AS&(D*&(*&E(Q*&E(*&(*YE(*#EY(*HIUWHQIWUHEWQ(WQ*UE(*Y!@!", (err) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido' });
      return;
    }

    next();
  });
};