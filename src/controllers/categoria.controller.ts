import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const criarCategoria = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { nome } = req.body;
    const novaCategoria = await prisma.categoria.create({
      data: {
        nome,
      },
    });
    res.status(200).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a categoria" });
  }
};

export const recuperarTodasCategorias = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { produtos: true },
    });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar as categorias" });
  }
};

export const recuperarCategoriaPorId = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: { produtos: true },
    });
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: "Categoria não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar a categoria" });
  }
};

export const atualizarCategoria = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: {
        nome,
      },
    });
    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a categoria" });
  }
};

export const deletarCategoria = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a categoria" });
  }
};
