import "express";

declare module "express" {
  interface Request {
    file?: Express.Multer.File; // Adiciona a propriedade `file` ao objeto `Request`
  }
}