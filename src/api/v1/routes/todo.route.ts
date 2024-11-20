import { Router } from 'express';
import { todoController } from '../controllers';

const router = Router();

router.route('/').get(todoController.getTodos).post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .put(todoController.updateTodo)
  .patch(todoController.updateTodoPart)
  .delete(todoController.deleteTodo);

export default router;
