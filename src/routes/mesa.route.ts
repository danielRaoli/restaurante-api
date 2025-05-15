import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import {
  atualizarMesa,
  criarMesa,
  deletarMesa,
  recuperarMesaPorId,
  recuperarMesas,
} from "../controllers/mesa.controller";
import { authenticateToken } from "../middlewares/auth";

const mesaRoutes = (prisma: PrismaClient) => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", authenticateToken  ,(req, res) => criarMesa(req, res, prisma));

  // Rota para atualizar um pedido existente
  router.put("/:id",authenticateToken ,(req, res) => atualizarMesa(req, res, prisma));

  // Rota para recuperar todos os pedidos
  router.get("/", authenticateToken, (req, res) => recuperarMesas(req, res, prisma));

  // Rota para recuperar um pedido por ID
  router.get("/:id", authenticateToken ,async (req, res) => {
    await recuperarMesaPorId(req, res, prisma);
  });

  // Rota para deletar um pedido
  router.delete("/:id", authenticateToken,(req, res) => deletarMesa(req, res, prisma));

  return router;
};

export default mesaRoutes;
