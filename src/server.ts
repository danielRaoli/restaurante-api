import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

import mesaRoutes from "./routes/mesa.route";
import pedidoRoutes from "./routes/pedido.route";
import produtoRoutes from "./routes/produto.route";
import categoriaRoutes from "./routes/categoria.route";
import subCategoriaRoutes from "./routes/subcategoria.route";

import cors from "cors";

const app = express();
const server = createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "https://restaurante-api-wv3i.onrender.com",
];
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'], 
});

const prisma = new PrismaClient();

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/mesas", mesaRoutes(prisma));
app.use("/pedidos", pedidoRoutes(prisma, io));
app.use("/produtos", produtoRoutes(prisma));
app.use("/categorias", categoriaRoutes(prisma));
app.use("/subcategorias", subCategoriaRoutes());

// WebSockets - Evento de conexão
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("chamarGarcom", (mesa) => {
    console.log("Chamando garcom na mesa: ", mesa);
    io.emit("garcomChamado", mesa);
  });

  socket.on("solicitandoConta", (mesa) => {
    console.log("Solicitando conta na mesa: ", mesa);
    io.emit("contaSolicitada", mesa);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
