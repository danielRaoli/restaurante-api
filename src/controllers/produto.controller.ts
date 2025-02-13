import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const criarProduto = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { nome, preco, categoriaId } = req.body;
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        preco,
        categoriaId,
      },
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};

export const recuperarProdutos = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar os produtos" });
  }
};

export const recuperarProdutoPorId = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto nao encontrado" });
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar o pedido" });
  }
};

export const atualizarProduto = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const { nome, preco, categoriaId } = req.body;
    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        preco,
        categoriaId,
      },
    });
    res.status(204).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
};

export const deletarProduto = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    await prisma.produto.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};
