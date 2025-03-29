import express from 'express'
import { todoRouter } from './routes/todo.routes.js';

const app = express();

app.use(express.json())

app.use("/api/todos", todoRouter);

export { app }