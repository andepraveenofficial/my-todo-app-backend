import { Request, Response } from 'express';
import { todoService } from '../services';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import asyncHandler from '../../../handlers/async.handler';
import { AuthRequest } from '../../../middlewares/auth.middleware';

export const createTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId; // Ensure you have a user ID from the auth middleware
    const todoData: CreateTodoDto = req.body;
    if (!userId) {
      throw new Error('User ID is required to create a todo');
    }
    const newTodo = await todoService.createTodo(userId, todoData);
    new ApiResponse(res, 201, 'Todo created successfully', newTodo);
  },
);

export const getTodos = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    const todos = await todoService.getTodos(userId);

    new ApiResponse(res, 200, 'Todos retrieved successfully', todos);
  },
);

export const getTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await todoService.getTodo(id);
  new ApiResponse(res, 200, 'Todo retrieved successfully', todo);
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateTodoDto = req.body;
  const updatedTodo = await todoService.updateTodo(id, updateData);
  new ApiResponse(res, 200, 'Todo updated successfully', updatedTodo);
});

export const updateTodoPart = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateTodoDto = req.body;
    const updatedTodo = await todoService.updateTodoPart(id, updateData);
    new ApiResponse(
      res,
      200,
      'Todo partially updated successfully',
      updatedTodo,
    );
  },
);

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await todoService.deleteTodo(id);
  new ApiResponse(res, 200, 'Todo deleted successfully', deletedTodo);
});
