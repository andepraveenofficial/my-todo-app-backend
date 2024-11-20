import { TodoModel } from '../models';
import prisma from '../../../config/prisma';
import ApiError from '../../../handlers/apiError.handler';
import { UpdateTodoDto } from '../dtos';

export const getTodosByUserId = async (
  userId: string,
): Promise<TodoModel[]> => {
  return await prisma.todo.findMany({
    where: {
      userId,
      deletedAt: null,
    },
  });
};

export const getTodoById = async (id: string): Promise<TodoModel> => {
  const todo = await prisma.todo.findUnique({ where: { id, deletedAt: null } });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};

export const createTodo = async (
  userId: string,
  title: string,
  description?: string,
): Promise<TodoModel> => {
  return await prisma.todo.create({
    data: {
      userId,
      title,
      description,
      status: 'PENDING',
    },
  });
};

export const updateTodo = async (
  id: string,
  updateData: UpdateTodoDto,
): Promise<TodoModel> => {
  const updatedTodo = await prisma.todo.update({
    where: { id, deletedAt: null },
    data: updateData,
  });
  return updatedTodo;
};

export const updateTodoPart = async (
  id: string,
  updateData: UpdateTodoDto,
): Promise<TodoModel> => {
  const partiallyUpdatedTodo = await prisma.todo.update({
    where: { id, deletedAt: null },
    data: updateData,
  });
  return partiallyUpdatedTodo;
};

export const softDeleteTodo = async (id: string): Promise<TodoModel> => {
  const existingTodo = await prisma.todo.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!existingTodo) {
    throw new ApiError(404, 'Todo not found or already deleted');
  }

  const deletedTodo = await prisma.todo.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return deletedTodo;
};
