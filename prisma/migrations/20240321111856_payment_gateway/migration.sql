/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `gatewayOrderId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "gatewayOrderId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
