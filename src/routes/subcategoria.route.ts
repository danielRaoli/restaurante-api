import { Router } from "express";
import {
  atualizarSubcategoria,
  criarSubcategoria,
  deletarSubcategoria,
  recuperarSubcategoriaPorId,
  recuperarTodasSubcategorias,
} from "../controllers/subcategoria.controller";

const subCategoriaRoutes = () => {
  const router = Router();

  // Rota para criar um novo pedido
  router.post("/", (req, res) => criarSubcategoria(req, res));

  // Rota para atualizar um pedido existente
  router.put("/:id", (req, res) => atualizarSubcategoria(req, res));

  // Rota para recuperar todos os pedidos
  router.get("/", (req, res) => recuperarTodasSubcategorias(req, res));

  // Rota para recuperar um pedido por ID
  router.get("/:id", async (req, res) => {
    await recuperarSubcategoriaPorId(req, res);
  });

  // Rota para deletar um pedido
  router.delete("/:id", (req, res) => deletarSubcategoria(req, res));

  return router;
};

export default subCategoriaRoutes;
