pragma solidity ^0.8.0;

contract TaskContract {
    struct Task {
        string title;
        string description;
        address createdBy;
        address assignedTo;
        uint256 deadline;
        string priority;
        string status;
    }

    Task[] public tasks;

    event TaskCreated(uint256 taskId, string title, address createdBy);
    event TaskUpdated(uint256 taskId, string status);

    function createTask(string memory title, string memory description, address assignedTo, uint256 deadline, string memory priority) public {
        tasks.push(Task(title, description, msg.sender, assignedTo, deadline, priority, "pending"));
        emit TaskCreated(tasks.length - 1, title, msg.sender);
    }

    function updateTask(uint256 taskId, string memory status) public {
        Task storage task = tasks[taskId];
        task.status = status;
        emit TaskUpdated(taskId, status);
    }

    function getTask(uint256 taskId) public view returns (Task memory) {
        return tasks[taskId];
    }
}
