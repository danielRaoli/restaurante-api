import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import {
  atualizarCategoria,
  criarCategoria,
  deletarCategoria,
  recuperarCategoriaPorId,
  recuperarTodasCategorias,
} from "../controllers/categoria.controller";

const categoriaRoutes = (prisma: PrismaClient) => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", (req, res) => criarCategoria(req, res, prisma));

  // Rota para atualizar um pedido existente
  router.put("/:id", (req, res) => atualizarCategoria(req, res, prisma));

  // Rota para recuperar todos os pedidos
  router.get("/", (req, res) => recuperarTodasCategorias(req, res, prisma));

  // Rota para recuperar um pedido por ID
  router.get("/:id", async (req, res) => {
    await recuperarCategoriaPorId(req, res, prisma);
  });

  // Rota para deletar um pedido
  router.delete("/:id", (req, res) => deletarCategoria(req, res, prisma));

  return router;
};

export default categoriaRoutes;
