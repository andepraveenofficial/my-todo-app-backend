import { PrismaClient } from '@prisma/client';
import { seedRoles } from './role.seed';
import { seedUsers } from './user.seed';
import { seedTodos } from './todo.seed';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedRoles();
    await seedUsers();
    await seedTodos();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    console.log('🎉  Seeding completed!');
    process.exit(0);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
