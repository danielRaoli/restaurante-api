import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import {
  atualizarMesa,
  criarMesa,
  deletarMesa,
  recuperarMesaPorId,
  recuperarMesas,
} from "../controllers/mesa.controller";

const mesaRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router.post("/", (req, res) =>
    criarMesa(req, res, prisma)
  );

  router.put("/:id", (req, res) =>
    atualizarMesa(req, res, prisma)
  );

  router.get("/", (req, res) =>
    recuperarMesas(req, res, prisma)
  );

  router.get("/:id", async (req, res) => {
    await recuperarMesaPorId(req, res, prisma);
  });

  router.delete("/:id", (req, res) =>
    deletarMesa(req, res, prisma)
  );

  return router;
};

export default mesaRoutes;
