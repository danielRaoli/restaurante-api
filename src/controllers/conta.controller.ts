import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Criar uma nova conta
export const criarConta = async (req: Request, res: Response) => {
  try {
    const { donoConta, statusConta = "Aberta", pedidos } = req.body;

    const novaConta = await prisma.conta.create({
      data: {
        donoConta,
        statusConta,
        pedidos: pedidos ? { create: pedidos } : undefined, 
      },
      include: {
        pedidos: true,
      },
    });

    return res.status(201).json(novaConta);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar conta" });
  }
};

// Listar todas as contas
export const listarContas = async (req: Request, res: Response) => {
  try {
    const contas = await prisma.conta.findMany({
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

    return res.json(contas);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar contas" });
  }
};

// Buscar conta por ID
export const buscarContaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const conta = await prisma.conta.findUnique({
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

    if (!conta) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    return res.json(conta);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar conta" });
  }
};

// Atualizar conta
export const atualizarConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { donoConta, statusConta } = req.body;

    const contaAtualizada = await prisma.conta.update({
      where: { id: parseInt(id) },
      data: { donoConta, statusConta },
    });

    return res.json(contaAtualizada);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar conta" });
  }
};

// Deletar conta
export const deletarConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.conta.delete({
      where: { id: parseInt(id) },
    });

    return res.status(204).send(); // Sem conteúdo, pois foi deletado com sucesso
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar conta" });
  }
};
