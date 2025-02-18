import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const criarSubcategoria = async (
  req: Request,
  res: Response,
) => {
  try {
    const { nome, categoriaId } = req.body;

    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: categoriaId },
    });

    if (!categoriaExiste) {
      res.status(404).json({ error: "Categoria não encontrada" });
      return;
    }

    const novaSubcategoria = await prisma.subCategoria.create({
      data: {
        nome,
        categoriaId,
      },
    });

    res.status(201).json(novaSubcategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a subcategoria" });
  }
};

// Recuperar todas as subcategorias
export const recuperarTodasSubcategorias = async (
  req: Request,
  res: Response,
) => {
  try {
    const subcategorias = await prisma.subCategoria.findMany({
      include: { categoria: true },
    });
    res.status(200).json(subcategorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar subcategorias" });
  }
};

// Recuperar subcategoria por ID
export const recuperarSubcategoriaPorId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const subcategoria = await prisma.subCategoria.findUnique({
      where: { id: Number(id) },
      include: { categoria: true },
    });

    if (!subcategoria) {
      return res.status(404).json({ error: "Subcategoria não encontrada" });
    }

    res.status(200).json(subcategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar a subcategoria" });
  }
};

// Atualizar uma subcategoria
export const atualizarSubcategoria = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { nome, categoriaId } = req.body;

    const subcategoriaExiste = await prisma.subCategoria.findUnique({
      where: { id: Number(id) },
    });

    if (!subcategoriaExiste) {
      res.status(404).json({ error: "Subcategoria não encontrada" });
      return;
    }

    const subcategoriaAtualizada = await prisma.subCategoria.update({
      where: { id: Number(id) },
      data: {
        nome,
        categoriaId,
      },
    });

    res.status(200).json(subcategoriaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a subcategoria" });
  }
};

// Deletar uma subcategoria
export const deletarSubcategoria = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    await prisma.subCategoria.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a subcategoria" });
  }
};
