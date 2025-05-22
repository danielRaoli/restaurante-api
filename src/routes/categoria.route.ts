import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import {
  atualizarCategoria,
  criarCategoria,
  deletarCategoria,
  recuperarCategoriaPorId,
  recuperarTodasCategorias,
} from "../controllers/categoria.controller";
import { authenticateToken } from "../middlewares/auth";

const categoriaRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router.post("/", authenticateToken,(req, res) => criarCategoria(req, res, prisma));

  router.put("/:id", authenticateToken ,(req, res) => atualizarCategoria(req, res, prisma));

  router.get("/",(req, res) => recuperarTodasCategorias(req, res, prisma));

  router.get("/:id", async (req, res) => {
    await recuperarCategoriaPorId(req, res, prisma);
  });

  router.delete("/:id", authenticateToken,(req, res) => deletarCategoria(req, res, prisma));

  return router;
};

export default categoriaRoutes;
