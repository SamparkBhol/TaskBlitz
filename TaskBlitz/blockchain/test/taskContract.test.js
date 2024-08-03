const TaskContract = artifacts.require("TaskContract");

contract("TaskContract", (accounts) => {
  let contract;

  before(async () => {
    contract = await TaskContract.deployed();
  });

  it("should create a task", async () => {
    await contract.createTask("Test Task", "Description", accounts[1], Date.now(), "High", { from: accounts[0] });
    const task = await contract.getTask(0);
    assert.equal(task.title, "Test Task", "Title should be Test Task");
  });

  it("should update a task", async () => {
    await contract.updateTask(0, "completed", { from: accounts[0] });
    const task = await contract.getTask(0);
    assert.equal(task.status, "completed", "Status should be completed");
  });
});
