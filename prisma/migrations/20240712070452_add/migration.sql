-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Store_userId_idx" ON "Store"("userId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
