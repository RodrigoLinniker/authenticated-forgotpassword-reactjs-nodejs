-- AlterTable
ALTER TABLE `user` MODIFY `resetPasswordToken` VARCHAR(191) NULL,
    MODIFY `resetPasswordTokenExpiry` VARCHAR(191) NULL;
