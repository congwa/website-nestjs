-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
