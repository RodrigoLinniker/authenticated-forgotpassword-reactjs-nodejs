import { hash } from 'bcryptjs';
import prismaClient  from '../src/database/prismaClient'

async function main() {
  const passwordHash = await hash('1234', 8);
  await prismaClient.user.upsert({
    where: { email: 'teste123@hotmail.com' },
    update: {},
    create: {
      email: 'teste123@hotmail.com',
      password: passwordHash,
    },
  })
}
main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })