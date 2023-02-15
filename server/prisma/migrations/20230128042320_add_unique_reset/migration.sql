/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordTokenExpiry]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_resetPasswordToken_key` ON `User`(`resetPasswordToken`);

-- CreateIndex
CREATE UNIQUE INDEX `User_resetPasswordTokenExpiry_key` ON `User`(`resetPasswordTokenExpiry`);
