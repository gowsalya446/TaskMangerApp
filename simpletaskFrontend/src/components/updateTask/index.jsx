import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './style.css'; 

export default function EditTask() {
  
  const { task_id } = useParams();

  
  const location = useLocation();
  const { task } = location.state || {}; 

  
  const [title, setTitle] = useState(task?.title || '');
  const [taskDetail, setTaskDetail] = useState(task?.task || '');
  const [isCompleted, setIsCompleted] = useState(task?.is_completed || false);

  
  const navigate = useNavigate();
  const handleUpdate = async () => {
    try {
     
      await fetch(`http://127.0.0.1:8000/api/task/${task_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          task: taskDetail,
          is_completed: isCompleted, 
        }),
      });

      console.log('Updating task with:', {
        title,
        task: taskDetail,
        is_completed: isCompleted,
      });
      console.log('Task updated successfully');

      navigate('/alltask');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  
  return (
    <div className="edit-task-container">
      <h2 className="edit-task-title">Edit Task</h2>
      <form
        className="edit-task-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Task:</label>
          <textarea
            value={taskDetail}
            onChange={(e) => setTaskDetail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Completed:</label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="form-checkbox"
          />
        </div>
        <button type="submit" className="update-button">
          Update Task
        </button>
      </form>
    </div>
  );
}
