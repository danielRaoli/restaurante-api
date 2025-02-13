import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  atualizarProduto,
  criarProduto,
  deletarProduto,
  recuperarProdutoPorId,
  recuperarProdutos,
} from "../controllers/produto.controller";

const produtoRoutes = (prisma: PrismaClient) => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", (req, res) => criarProduto(req, res, prisma));

  // Rota para atualizar um pedido existente
  router.put("/:id", (req, res) => atualizarProduto(req, res, prisma));

  // Rota para recuperar todos os pedidos
  router.get("/", (req, res) => recuperarProdutos(req, res, prisma));

  // Rota para recuperar um pedido por ID
  router.get("/:id", async (req, res) => {
    await recuperarProdutoPorId(req, res, prisma);
  });

  // Rota para deletar um pedido
  router.delete("/:id", (req, res) => deletarProduto(req, res, prisma));

  return router;
};

export default produtoRoutes;