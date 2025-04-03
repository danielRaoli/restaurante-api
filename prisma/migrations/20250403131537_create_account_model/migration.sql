-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "contaId" INTEGER;

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "donoConta" TEXT NOT NULL,
    "statusConta" TEXT NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
