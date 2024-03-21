/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock_status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - Added the required column `barCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gst` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hsnCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceWithoutGst` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTitle` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productVersion` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skuCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specification` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "orderId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "image_url",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "stock_status",
DROP COLUMN "updated_at",
DROP COLUMN "weight",
ADD COLUMN     "barCode" TEXT NOT NULL,
ADD COLUMN     "gst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hsnCode" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "overview" JSONB NOT NULL,
ADD COLUMN     "priceWithoutGst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "primaryImage" JSONB NOT NULL,
ADD COLUMN     "productDescription" TEXT NOT NULL,
ADD COLUMN     "productTitle" TEXT NOT NULL,
ADD COLUMN     "productVersion" TEXT NOT NULL,
ADD COLUMN     "qty" TEXT NOT NULL,
ADD COLUMN     "skuCode" TEXT NOT NULL,
ADD COLUMN     "specification" JSONB NOT NULL,
ADD COLUMN     "stock" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "house_no" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "isDefult" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "total_amount" TEXT NOT NULL,
    "currency_type" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_sgnature" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "attempt" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "payment_note" TEXT NOT NULL,
    "payment_meta" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "paymentId" TEXT,
    "userId" TEXT,
    "orderStatus" DOUBLE PRECISION DEFAULT 0.0,
    "trackingId" DOUBLE PRECISION,
    "estDeliverDate" DOUBLE PRECISION,
    "actDeliverDate" TEXT,
    "trackingStatus" TEXT,
    "gstin" DOUBLE PRECISION,
    "totalAmount" JSONB NOT NULL,
    "deliveryDetail" JSONB NOT NULL,
    "currency" JSONB NOT NULL,
    "shippingCost" DOUBLE PRECISION,
    "otherCost" DOUBLE PRECISION,
    "billToAddressId" TEXT,
    "shipToAddressId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_id_key" ON "UserAddress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billToAddressId_fkey" FOREIGN KEY ("billToAddressId") REFERENCES "UserAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipToAddressId_fkey" FOREIGN KEY ("shipToAddressId") REFERENCES "UserAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
