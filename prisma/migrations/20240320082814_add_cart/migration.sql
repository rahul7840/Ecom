-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "add_to_cart" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wish_list" BOOLEAN NOT NULL DEFAULT false;
