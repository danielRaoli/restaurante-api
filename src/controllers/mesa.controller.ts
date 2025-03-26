import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const criarMesa = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { numero } = req.body;
    const novaMesa = await prisma.mesa.create({
      data: {
        numero,
      },
    });
    res.status(200).json(novaMesa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a mesa" });
  }
};

export const recuperarMesas = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const mesas = await prisma.mesa.findMany({
      include: {
        pedidos: {
          include: {
            produtos: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar as mesas" });
  }
};

export const recuperarMesaPorId = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const mesa = await prisma.mesa.findUnique({
      where: { id: parseInt(id) },
      include: {
        pedidos: {
          include: {
            produtos: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });

    if (mesa) {
      res.json(mesa);
    } else {
      res.status(404).json({ error: "Mesa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar a mesa" });
  }
};

export const atualizarMesa = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    const { numero } = req.body;
    const mesaAtualizada = await prisma.mesa.update({
      where: { id: parseInt(id) },
      data: { numero },
    });
    res.json(mesaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a mesa" });
  }
};

export const deletarMesa = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    const { id } = req.params;
    await prisma.mesa.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a mesa" });
  }
};
