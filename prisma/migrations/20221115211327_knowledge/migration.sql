-- CreateTable
CREATE TABLE "Knowledge" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "preview" TEXT,
    "categoryID" INTEGER NOT NULL,

    CONSTRAINT "Knowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeCategory" (
    "id" SERIAL NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 500,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "KnowledgeCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Knowledge" ADD CONSTRAINT "Knowledge_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "KnowledgeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
