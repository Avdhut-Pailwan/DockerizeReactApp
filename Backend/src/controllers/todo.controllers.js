import { Todo } from '../models/todo.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const fetchTodos = async (_, res) => {
	try {
		const todos = await Todo.find().sort({ createdAt: -1 });
		return res.status(200).json(new ApiResponse(200, todos));
	} catch (error) {
		throw new ApiError(500, 'Failed to fetch todos from database');
	}
}

export const addTodo = async (req, res) => {
  const {title} = req.body;

  try {
    const todo = await Todo.create({title, completed:false})
    return res.status(201)
      .json(new ApiResponse(201, todo));
  } catch (error) {
    throw new ApiError(500, 'Failed to add todo');
  }
}

export const updateTodo = async (req, res) => {
  const {id, title} = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, {title}, {new:true})
    return res.status(200)
      .json(new ApiResponse(200, todo));
  } catch (error) {
    throw new ApiError(500, 'Failed to update todo');
  }
}

export const deleteTodo = async (req, res) => {
  const {id} = req.body;

  try {
    await Todo.findByIdAndDelete(id);
    return res.status(200)
      .json(new ApiResponse(200, null, 'Todo deleted successfully'));
  } catch (error) {
    throw new ApiError(500, 'Failed to delete todo');
  }
}

export const toggleCompletedStatusOfTodo = async (req, res) => {
  const {id} = req.body;
  try {
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    return res.status(200)
      .json(new ApiResponse(200, todo));
  } catch (error) {
    throw new ApiError(500, 'Failed to toggle completed status of todo');
  }
}