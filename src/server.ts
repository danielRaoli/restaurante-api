import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

import mesaRoutes from "./routes/mesa.route";
import pedidoRoutes from "./routes/pedido.route";
import produtoRoutes from "./routes/produto.route";
import categoriaRoutes from "./routes/categoria.route";
import subCategoriaRoutes from "./routes/subcategoria.route";
import authRoutes from "./routes/auth.route";

import cors from "cors";
import contaRoutes from "./routes/conta.route";

const app = express();
const server = createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",

];
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
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
app.use("/contas", contaRoutes());
app.use("/login", authRoutes());

// WebSockets - Evento de conexão
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("chamarGarcom", (mesa) => {
    console.log("Chamando garcom na mesa: ", mesa);
    io.emit("garcomChamado", mesa);
  });

  socket.on("solicitandoConta", ({ numeroMesa, idConta,donoConta }) => {
    console.log(
      "Solicitando conta na mesa: " +
        numeroMesa +
        "\nDono da conta: " +
        donoConta
    );
    

    io.emit("contaSolicitada", { numeroMesa, idConta,donoConta });
  });

  socket.on("pedidoRealizado", (data: { contaId: number }) => {
    io.emit("atualizarPedidos", { contaId: data.contaId });
  });


  socket.on("fecharConta", (data: { contaId: number }) => {
    io.emit("contaFechada", { contaId: data.contaId });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT =  5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
