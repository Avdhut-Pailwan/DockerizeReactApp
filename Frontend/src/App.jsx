import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import axios from 'axios';
import TodoDisplay from './components/TodoDisplay';

function App() {
	const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/todos/all');
      setTodos(data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className='grid grid-cols-12 w-screen'>
			<div className='col-start-4 col-span-6'>
				<div className='flex justify-center items-center flex-col'>
        <h2 className='mt-10 text-3xl font-bold text-center'>Todos</h2>
					<TodoInput onAdd={fetchData}/>
          <TodoDisplay todos={todos} onToggle={fetchData} onEdit={fetchData} onDelete={fetchData}/>
				</div>
			</div>
		</div>
	);
}

export default App;
