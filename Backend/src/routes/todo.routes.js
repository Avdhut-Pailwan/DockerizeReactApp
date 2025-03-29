import { Router } from 'express';

import { addTodo, deleteTodo, fetchTodos, toggleCompletedStatusOfTodo, updateTodo } from '../controllers/todo.controllers.js';

const todoRouter = Router();

todoRouter.get('/all', fetchTodos);
todoRouter.post('/add', addTodo);
todoRouter.put('/update', updateTodo);
todoRouter.delete('/delete', deleteTodo);
todoRouter.patch('/toggleCompleted', toggleCompletedStatusOfTodo);


export { todoRouter };
