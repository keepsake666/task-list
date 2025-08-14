import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState({
    taskList: true,
    tasks: true,
    completedTasks: true,
  });
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  function toggleSections(section) {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  function toggleSortOder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter((item) => !item.completed));
  const completedTasks = tasks.filter((item) => item.completed);

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
        {isOpen.taskList && <TaskForm addTask={addTask} />}
      </div>

      <div className="task-container">
        <h1>Tasks</h1>
        <button
          className={`close-button  ${isOpen.tasks ? "open" : " "}`}
          onClick={() => toggleSections("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOder("date")}
          >
            By Date{" "}
            {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOder("priority")}
          >
            By Priority{" "}
            {sortType === "priority" &&
              (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
        </div>
        {isOpen.tasks && (
          <TaskList
            activeTasks={activeTasks}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        )}
      </div>

      <div className="completed-task-container">
        <h1>Completed task</h1>
        <button
          className={`close-button  ${isOpen.completedTasks ? "open" : " "}`}
          onClick={() => toggleSections("completedTasks")}
        >
          +
        </button>
        {isOpen.completedTasks && (
          <CompletedTaskTilst
            completedTasks={completedTasks}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
    }
    setTitle("");
    setPriority("Low");
    setDeadline("");
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="task title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="datetime-local"
        required
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          key={task.id}
          deleteTask={deleteTask}
          completeTask={completeTask}
          task={task}
        />
      ))}
    </ul>
  );
}

function CompletedTaskTilst({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ deleteTask, completeTask, task }) {
  const { title, priority, deadline, id, completed } = task;
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          delete
        </button>
      </div>
    </li>
  );
}

export default App;
