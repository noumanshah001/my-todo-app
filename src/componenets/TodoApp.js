import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTasks, setNewTasks] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }
    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = { ...updatedTasks[editingTaskIndex], text: newTasks };
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      setNewTasks('');
    } else {
      setTasks([...tasks, { text: newTask, count: 0 }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setNewTasks(tasks[index].text);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], text: newTasks };
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setNewTasks('');
  };

  const handleIncrement = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].count += 1;
    updatedTasks[index].backgroundColor = 'blue';
    setTasks(updatedTasks);
  };

  const handleDecrement = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].count -= 1;
    updatedTasks[index].backgroundColor = 'blue';
    setTasks(updatedTasks);
  };

  const handleReset = () => {
    const resetTasks = tasks.map((task) => ({ ...task, count: 0 }));
    setTasks(resetTasks);
    setNewTask('');
    setEditingTaskIndex(null);
  };

  const formatDateTime = (date) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleEditOrDelete = (index) => {
    if (editingTaskIndex === index) {
      handleSaveTask(index);
    } else {
      handleEditTask(index);
    }
  };

  return (
    <div>
      <div className='bcolor'>
        <h1>{formatDateTime(currentDateTime)}</h1>
      </div>
      <div className='text1'>
        <input
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ width: '230px', height: '40px', marginTop: '25px', paddingLeft: '14px' }}
        />
        <label htmlFor="taskName" style={{ position: 'absolute', marginTop: '30px', marginLeft: '-30px', color: '#6c757d' }}>
          
        </label>
      </div>
      <p className="heading">Enter Task</p>
      <div className='texts2'>
        <button
          className='btnHover'
          onClick={handleAddTask}
          style={{ color: 'white', marginTop: '-12px', height: '42px', width: '110px', borderRadius: '5px', border: 'none' }}
        >
          {editingTaskIndex !== null ? 'Add Task' : 'Add Task'}
        </button>
      </div>
      <div className='texte3'>
        <button
          className='btnHover'
          onClick={handleReset}
          style={{ backgroundColor: '#dc3545', color: 'white', marginTop: '-4px', height: '35px', width: '200px', borderRadius: '5px', border: 'none' }}
        >
          Reset Numbers of Person
        </button>
      </div>

      <div>
        <div>
        </div>
        {tasks.map((task, index) => (
          <div key={index}>
            <button className="task-box1"
              onClick={() => handleIncrement(index)}
              style={{ backgroundColor: 'gray', color: 'white', marginRight: '-10px', width: '20px', height: '30px', borderRadius: '5px', border: 'none' }}
            >
              +
            </button>
            <button
              onClick={() => handleDecrement(index)}
              style={{ backgroundColor: 'gray', color: 'white', marginLeft: '10px', marginRight: '10px', width: '20px', height: '30px', borderRadius: '5px', border: 'none' }}
            >
              -
            </button>

            <span 
  style={{backgroundColor: task.count === 0 ? '#ffc107' : task.backgroundColor || 'inherit',
       color: task.count === 0 ? 'black' : task.backgroundColor ? 'white' : 'inherit',
       marginRight: '10px',padding: '4px',borderRadius: '5px'
  }}
>
  {task.count === 0 ? 'person zero' : `persons ${task.count}`}
</span>

            {editingTaskIndex === index ? (
              <input
                type="text"
                value={newTasks}
                onChange={(e) => setNewTasks(e.target.value)}
                style={{ width: '600px', height: '30px', marginTop: '20px' }}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <button className='btnSE' onClick={() => handleEditOrDelete(index)} style={{ border: 'none' }}>
              {editingTaskIndex === index ? 'Save' : 'Edit'}
            </button>

            <button className='btnd' onClick={() => handleDeleteTask(index)} style={{ color: 'white', width: '60px', height: '40px', border: 'none' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
