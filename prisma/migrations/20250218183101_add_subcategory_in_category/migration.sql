-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "categoriaPaiId" INTEGER;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_categoriaPaiId_fkey" FOREIGN KEY ("categoriaPaiId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
