import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos').then((response) => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:5000/todos', { name, description }).then((response) => {
            setTodos([...todos, response.data]);
            setName('');
            setDescription('');
        });
    };

    const toggleDone = (id) => {
        axios.put(`http://localhost:5000/todos/${id}`).then((response) => {
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo._id !== id));
        });
    };

    return (
        <div id="app-container">
            <h1>To-Do List</h1>
            <input
                type="text"
                placeholder="Todo Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span className={todo.isDone ? 'done' : ''}>
                            {todo.name}: {todo.description}
                        </span>
                        <button onClick={() => toggleDone(todo._id)}>
                            {todo.isDone ? '✔' : 'Done'}
                        </button>
                        <button onClick={() => deleteTodo(todo._id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
