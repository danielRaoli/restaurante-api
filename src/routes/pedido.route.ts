import { Router } from "express";
import {
  atualizarPedido,
  criarPedido,
  deletarPedido,
  recuperarPedidoPorId,
  recuperarPedidos,
} from "../controllers/pedido.controller";
import { PrismaClient } from "@prisma/client";

const pedidoRoutes = (prisma: PrismaClient, io: any) => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", (req, res) => criarPedido(req, res, prisma, io));

  // Rota para atualizar um pedido existente
  router.put("/:id", (req, res) => atualizarPedido(req, res, prisma));

  // Rota para recuperar todos os pedidos
  router.get("/", (req, res) => recuperarPedidos(req, res, prisma));

  // Rota para recuperar um pedido por ID
  router.get("/:id", async (req, res) => {
    await recuperarPedidoPorId(req, res, prisma);
  });

  // Rota para deletar um pedido
  router.delete("/:id", (req, res) => deletarPedido(req, res, prisma));

  return router;
};

export default pedidoRoutes;
