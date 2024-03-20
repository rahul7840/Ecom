-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "discountPerc" DOUBLE PRECISION NOT NULL,
    "rule" TEXT NOT NULL,
    "expireDay" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT NOT NULL,
    "couponCode" TEXT,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_id_key" ON "Discount"("id");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
