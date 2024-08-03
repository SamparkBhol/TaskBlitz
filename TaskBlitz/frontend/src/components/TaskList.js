import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
    return (
        <ul>
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;
