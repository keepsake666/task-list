import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState({
    taskList: true,
    tasks: true,
    completedTasks: true,
  });

  function toggleSections(section) {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task list with Priority</h1>
        <button
          className={`close-button  ${isOpen.taskList ? "open" : " "}`}
          onClick={() => toggleSections("taskList")}
        >
          +
        </button>
        {isOpen.taskList && <TaskForm />}
      </div>

      <div className="task-container">
        <h1>Tasks</h1>
        <button
          className={`close-button  ${isOpen.tasks ? "open" : " "}`}
          onClick={() => toggleSections("tasks")}
        >
          +
        </button>
        <div>
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {isOpen.tasks && <TaskList />}
      </div>

      <div className="completed-task-container">
        <h1>Completed task</h1>
        <button
          className={`close-button  ${isOpen.completedTasks ? "open" : " "}`}
          onClick={() => toggleSections("completedTasks")}
        >
          +
        </button>
        {isOpen.completedTasks && <CompletedTaskTilst />}
      </div>
    </div>
  );
}

function TaskForm() {
  return (
    <form action="" className="task-form">
      <input
        type="text"
        value={"Some text"}
        placeholder="task title"
        required
      />
      <select value={""}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="datetime-local" required value={""} />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList() {
  return (
    <ul className="task-list">
      <TaskItem />
    </ul>
  );
}

function CompletedTaskTilst() {
  return (
    <ul className="completed-task-list">
      <TaskItem />
    </ul>
  );
}

function TaskItem() {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          Title <strong>Medium</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button">delete</button>
      </div>
    </li>
  );
}

export default App;
