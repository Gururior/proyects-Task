/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
