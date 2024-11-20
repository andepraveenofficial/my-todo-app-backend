export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

export interface GetTodosDto {
  userId: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  search?: string;
}

export interface DeleteTodoDto {
  todoId: string;
}

export interface TodoStatusUpdateDto {
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}
