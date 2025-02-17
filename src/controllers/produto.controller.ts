import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

export const criarProduto = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  try {
    console.log("Corpo da requisição:", req.body); // Log do corpo da requisição
    console.log("Arquivo enviado:", req.file); // Log do arquivo enviado
    const { nome, preco, categoriaId } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !preco || !categoriaId) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    let imagemUrl = "";

    // Se um arquivo foi enviado, faz upload no Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "produtos",
      });
      imagemUrl = result.secure_url;
    } else if (req.body.imagem) {
      // Se já tiver uma URL no corpo, usa ela
      imagemUrl = req.body.imagem;
    } else {
      return res.status(400).json({ error: "A imagem é obrigatória" });
    }

    // Cria o produto no banco de dados
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        preco: parseFloat(preco),
        imagem: imagemUrl,
        categoriaId: Number(categoriaId),
      },
    });

    res.status(201).json(novoProduto);
  } catch (error: any) {
    console.error("Erro ao criar produto:", error); // Log detalhado do erro
    res
      .status(500)
      .json({ error: "Erro interno do servidor", details: error.message });
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
    const { nome, preco, categoriaId, imagem } = req.body;

    // Verifica se o produto existe
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!produtoExistente) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    let imagemUrl = produtoExistente.imagem; // Mantém a imagem atual por padrão

    // Se um arquivo foi enviado, faz upload no Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "produtos",
      });
      imagemUrl = result.secure_url; // Atualiza a imagem com a nova URL
    } else if (imagem) {
      // Se a requisição enviou uma URL de imagem, atualiza
      imagemUrl = imagem;
    }

    // Atualiza o produto no banco de dados
    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome: nome || produtoExistente.nome,
        preco: preco ? parseFloat(preco) : produtoExistente.preco,
        categoriaId: categoriaId
          ? Number(categoriaId)
          : produtoExistente.categoriaId,
        imagem: imagemUrl,
      },
    });

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error(error);
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
