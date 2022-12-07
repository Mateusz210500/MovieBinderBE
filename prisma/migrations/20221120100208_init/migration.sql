-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
