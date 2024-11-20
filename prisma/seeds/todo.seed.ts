import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedTodos = async () => {
  // Delete all existing todos (optional, based on your needs)
  await prisma.todo.deleteMany();

  // Fetch all users from the database
  const users = await prisma.user.findMany();

  // Check if users exist
  if (users.length === 0) {
    console.log('No users found to assign todos.');
    return;
  }

  // Create some sample todos for the users
  const todos = [
    {
      userId: users[0].id, // Assign todo to the first user
      title: 'Finish the project',
      description: 'Complete the final project for the course.',
      status: 'PENDING', // Updated to match Prisma schema
    },
    {
      userId: users[0].id, // Assign todo to the first user
      title: 'Buy groceries',
      description: 'Get groceries for the week.',
      status: 'IN_PROGRESS', // Updated to match Prisma schema
    },
    {
      userId: users[1].id, // Assign todo to the second user
      title: 'Prepare dinner',
      description: 'Cook dinner for the family.',
      status: 'COMPLETED', // Updated to match Prisma schema
    },
    {
      userId: users[2].id, // Assign todo to the third user
      title: 'Read a book',
      description: 'Finish reading the latest book on the shelf.',
      status: 'PENDING',
    },
  ];

  // Loop through the todo array and create each todo in the database
  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }

  console.log('🌱  Todos seeded successfully');
};
