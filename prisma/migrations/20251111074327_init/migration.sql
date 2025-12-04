-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(150) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" VARCHAR(10) NOT NULL,
    "due_date" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
