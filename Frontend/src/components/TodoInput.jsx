import axios from 'axios';
import React from 'react';

function TodoInput({ onAdd }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		if (title && title.trim() !== '') {
			axios
				.post('/api/todos/add', { title })
				.then((response) => {
					if(response.data.success){
						onAdd();
					}
					e.target.reset();
				})
				.catch((error) => console.error('Error adding todo:', error));
		}
	};
	return (
		<form className='flex flex-row items-center justify-evenly gap-5 mt-10 w-full flex-wrap bg-gray-100 p-5 rounded-2xl' onSubmit={handleSubmit}>
			<input
				id='title'
				name='title'
				type='text'
				placeholder='Your todo...'
				className='border-2 rounded-2xl p-2.5 w-9/12'
			/>
			<button
				className='bg-blue-500 rounded-2xl px-8 py-2.5 hover:cursor-pointer hover:bg-blue-600'>
				<span className='text-white'>Add</span>
			</button>
		</form>
	);
}

export default TodoInput;
