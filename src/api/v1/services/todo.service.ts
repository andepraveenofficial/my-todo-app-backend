import { TodoModel } from '../models';
import { todoRepository } from '../repositories';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';

export const getTodos = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error('User ID is required to get todos');
  }
  return await todoRepository.getTodosByUserId(userId);
};

export const getTodo = async (id: string): Promise<TodoModel> => {
  const todo = await todoRepository.getTodoById(id);
  return todo;
};

export const createTodo = async (
  userId: string,
  todoData: CreateTodoDto,
): Promise<TodoModel> => {
  const todo = await todoRepository.createTodo(
    userId,
    todoData.title,
    todoData.description,
  );
  return todo;
};
export const updateTodo = async (
  id: string,
  updateData: UpdateTodoDto,
): Promise<TodoModel> => {
  const todo = await todoRepository.updateTodo(id, updateData);
  return todo;
};

export const updateTodoPart = async (
  id: string,
  updates: UpdateTodoDto,
): Promise<TodoModel> => {
  const todo = await todoRepository.updateTodoPart(id, updates);
  return todo;
};

export const deleteTodo = async (id: string): Promise<TodoModel> => {
  const todo = await todoRepository.softDeleteTodo(id);
  return todo;
};
