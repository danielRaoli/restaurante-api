/*
  Warnings:

  - You are about to drop the column `categoriaPaiId` on the `Categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_categoriaPaiId_fkey";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "categoriaPaiId";

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "subcategoriaId" INTEGER;

-- CreateTable
CREATE TABLE "SubCategoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "SubCategoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubCategoria" ADD CONSTRAINT "SubCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "SubCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
