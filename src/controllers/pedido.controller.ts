import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const criarPedido = async (
  req: Request,
  res: Response,
  prisma: PrismaClient,
  io: any
) => {
  try {
    const { mesaId, status, contaId, produtos } = req.body;
    const pedido = await prisma.pedido.create({
      data: {
        mesaId,
        status: status,
        contaId,
        produtos: {
          create: produtos.map(
            (p: { produtoId: string; quantidade: number }) => ({
              produtoId: p.produtoId,
              quantidade: p.quantidade,
            })
          ),
        },
      },
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });

    io.emit("pedidoRealizado", pedido);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o pedido" });
  }
};

export const atualizarPedido = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  const { id } = req.params;
  const { mesaId, status, contaId, produtos } = req.body;

  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        mesaId,
        status,
        contaId,
        produtos: {
          deleteMany: {},
          create: produtos.map(
            (p: { produtoId: string; quantidade: number }) => ({
              produtoId: p.produtoId,
              quantidade: p.quantidade,
            })
          ),
        },
      },
    });

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o pedido" });
  }
};

export const recuperarPedidos = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar os pedidos" });
  }
};

export const recuperarPedidoPorId = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar o pedido" });
  }
};

export const deletarPedido = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  const { id } = req.params;
  try {
    const pedido = await prisma.pedido.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o pedido" });
  }
};
