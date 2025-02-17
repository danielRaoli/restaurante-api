import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  atualizarProduto,
  criarProduto,
  deletarProduto,
  recuperarProdutoPorId,
  recuperarProdutos,
} from "../controllers/produto.controller";
import { upload } from "../config/cloudinary";
import express, { Request, Response, NextFunction } from "express";

// Extenda o tipo Request para reconhecer a propriedade file
export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

const produtoRoutes = (prisma: PrismaClient) => {
  const router = Router();

  // Rota para criar um novo produto
  router.post(
    "/",
    upload.single("imagem"),
    async (req: RequestWithFile, res: Response, next: NextFunction) => {
      try {
        await criarProduto(req, res, prisma);
      } catch (error: any) {
        console.error("Erro ao criar produto:", error); // Log do erro no console
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
      }
    }
  );

  // Rota para atualizar um produto existente
  router.put(
    "/:id",
    upload.single("imagem"),
    async (req: RequestWithFile, res: Response, next) => {
      try {
        await atualizarProduto(req, res, prisma);
      } catch (error) {
        next(error);
      }
    }
  );

  // Rota para recuperar todos os produtos
  router.get("/", (req, res) => recuperarProdutos(req, res, prisma));

  // Rota para recuperar um produto por ID
  router.get("/:id", async (req, res) => {
    await recuperarProdutoPorId(req, res, prisma);
  });

  // Rota para deletar um produto
  router.delete("/:id", (req, res) => deletarProduto(req, res, prisma));

  return router;
};

export default produtoRoutes;
