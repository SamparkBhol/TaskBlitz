import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import TaskList from './components/TaskList';

const socket = io('http://localhost:4000');

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data));

        socket.on('taskUpdated', task => {
            setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? task : t));
        });

        return () => socket.off('taskUpdated');
    }, []);

    return (
        <div>
            <h1>Task Management</h1>
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;
