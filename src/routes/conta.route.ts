import { Router } from "express";
import {
  atualizarConta,
  buscarContaPorId,
  criarConta,
  deletarConta,
  listarContas,
} from "../controllers/conta.controller";
import { authenticateToken } from "../middlewares/auth";

const contaRoutes = () => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", async (req, res) => {
    await criarConta(req, res);
  });

  // Rota para atualizar um pedido existente
  router.put("/:id", authenticateToken,async (req, res) => {
    await atualizarConta(req, res);
  });

  // Rota para recuperar todos os pedidos
  router.get("/", authenticateToken,async (req, res) => {
    await listarContas(req, res);
  });

  // Rota para recuperar um pedido por ID
  router.get("/:id", async (req, res) => {
    await buscarContaPorId(req, res);
  });

  // Rota para deletar um pedido
  router.delete("/:id", authenticateToken ,async (req, res) => {
    await deletarConta(req, res);
  });

  return router;
};

export default contaRoutes;
