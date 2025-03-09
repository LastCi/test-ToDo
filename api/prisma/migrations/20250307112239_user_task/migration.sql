-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "login" TEXT,
    "password" TEXT,
    "supervisor_id" TEXT,
    "name" TEXT,
    "surname" TEXT,
    "patronymic" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tasks" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "responsible_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
