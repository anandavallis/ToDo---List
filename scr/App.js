import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      {/* Task input section */}
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          <span className="plus-icon">+</span>
        </button>
      </div>

      {/* Task statistics */}
      {totalCount > 0 && (
        <div className="task-stats">
          {completedCount} of {totalCount} tasks completed
        </div>
      )}

      {/* Task list */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleComplete(task.id)}
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
              >
                {task.completed && <span className="check-icon">✓</span>}
              </button>

              {/* Task text */}
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>

              {/* Delete button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                <span className="delete-icon">🗑️</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear completed tasks button */}
      {completedCount > 0 && (
        <button
          onClick={() => setTasks(tasks.filter(task => !task.completed))}
          className="clear-completed"
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoApp;
