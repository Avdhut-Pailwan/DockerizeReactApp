import axios from 'axios';

function TodoDisplay({ todos, onToggle, onEdit, onDelete }) {
	const completedTodos = todos.filter((todo) => todo.completed);
	const notCompletedTodos = todos.filter((todo) => !todo.completed);

	const notCompletedClassList = 'text-lg font-semibold';
	const completedClassList = 'text-lg font-semibold text-gray-500 line-through';

	async function handleTodoCardClick(e) {
		const todoId = e.target.parentElement.getAttribute('data_id') || e.target.getAttribute('data_id');

		try {
			const response = await axios.patch(`/api/todos/toggleCompleted`, {
				id: todoId,
			});
			if (response.data.success) {
				onToggle();
			} else {
				alert('Failed to toggle todo completion status.');
			}
		} catch (error) {
			console.error('Error toggling todo completion:', error);
		}
	}

  async function handleEdit(e) {
    e.stopPropagation();

    const todoTitleElement = e.target.parentElement.previousElementSibling;
    const todoTitle = todoTitleElement.innerText;
    const todoId = e.target.parentElement.parentElement.getAttribute('data_id');
    const newTitle = prompt('Edit Todo', todoTitle);

    if (newTitle && newTitle.trim() !== '') {
      try {
        const response = await axios.put('/api/todos/update', {
          id: todoId,
          title: newTitle,
        });
        if (response.data.success) {
          onEdit();
        } else {
          alert('Failed to update todo.');
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  }

  async function handleDelete(e) {
    e.stopPropagation();

    const todoId = e.target.parentElement.parentElement.getAttribute('data_id');
    try {
      const response = await axios.delete('/api/todos/delete', {
        data: { id: todoId },
      });
      if (response.data.success) {
        onDelete();
      } else {
        alert('Failed to delete todo.');
      }
    }
    catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

	function todoCard(todo) {
		return (
			<div
				data_id={todo._id}
				key={todo._id}
				className='bg-white p-5 rounded-xl shadow-md flex justify-between items-center hover:cursor-pointer hover:bg-gray-50'
				onClick={handleTodoCardClick}>
				<h3
					className={
						todo.completed ? completedClassList : notCompletedClassList
					}>
					{todo.title}
				</h3>
				<div className='flex gap-5'>
					<button className='rounded-2xl bg-blue-400 text-white py-1.5 px-5 hover:cursor-pointer hover:bg-blue-500' onClick={handleEdit}>
						Edit
					</button>
					<button className='rounded-2xl bg-red-400 text-white py-1.5 px-3 hover:cursor-pointer hover:bg-red-500' onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			{notCompletedTodos.length > 0 && (
				<div className='bg-gray-100 p-5 rounded-2xl my-10 w-full'>
					<h2 className='text-2xl font-medium text-red-300'>Not Completed</h2>
					<div className='flex flex-col gap-5 mt-5'>
						{notCompletedTodos.map((todo) => todoCard(todo))}
					</div>
				</div>
			)}
			{completedTodos.length > 0 && (
				<div className='bg-gray-100 p-5 rounded-2xl mb-10 w-full'>
					<h2 className='text-2xl font-medium text-green-300'> Completed</h2>
					<div className='flex flex-col gap-5 mt-5'>
						{completedTodos.map((todo) => todoCard(todo))}
					</div>
				</div>
			)}
		</>
	);
}

export default TodoDisplay;
