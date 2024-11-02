-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BAKERY', 'PIZZERIA', 'RESTAURANT', 'CAFE', 'BAR', 'OTHER');

-- CreateTable
CREATE TABLE "Establishment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "ifoodUrl" TEXT,
    "aboutUs" TEXT,
    "websiteUrl" TEXT,
    "openingHours" JSONB,
    "rating" DOUBLE PRECISION,
    "category" "Category" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_slug_key" ON "Establishment"("slug");

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
