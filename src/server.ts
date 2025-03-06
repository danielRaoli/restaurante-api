import express from "express";
import { PrismaClient } from "@prisma/client";

import mesaRoutes from "./routes/mesa.route";
import pedidoRoutes from "./routes/pedido.route";
import produtoRoutes from "./routes/produto.route";
import categoriaRoutes from "./routes/categoria.route";
import subCategoriaRoutes from "./routes/subcategoria.route";

import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cors());

app.use(express.json());

app.use("/mesas", mesaRoutes(prisma));
app.use("/pedidos", pedidoRoutes(prisma));
app.use("/produtos", produtoRoutes(prisma));
app.use("/categorias", categoriaRoutes(prisma));
app.use("/subcategorias", subCategoriaRoutes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
