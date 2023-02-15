-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetPasswordToken` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `resetPasswordTokenExpiry` VARCHAR(191) NOT NULL DEFAULT '';
