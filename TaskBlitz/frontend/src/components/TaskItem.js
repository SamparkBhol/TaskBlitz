import React from 'react';

const TaskItem = ({ task }) => {
    return (
        <li>{task.title}</li>
    );
};

export default TaskItem;
