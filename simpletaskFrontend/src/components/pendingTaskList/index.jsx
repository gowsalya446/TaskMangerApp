import React, { useEffect, useState } from 'react';
export default function Pendingtask(){
   

    
      const [tasks, setTasks] = useState([]); 
      const [loading, setLoading] = useState(true); 
      const [error, setError] = useState(null); 
    
      useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/task/');
            if (!response.ok) {
              throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data); 
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTasks();
      }, []); 
    
      
      const pendingTasks = tasks.filter(task => !task.is_completed);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
    
      return (
        <div className="table-container">
      <h2 className="table-title">Pending List</h2>
      <table className="task-table">
        <thead className="task-table-header">
          <tr>
            <th className="task-table-header-cell">ID</th>
            <th className="task-table-header-cell">Title</th>
            <th className="task-table-header-cell">Task</th>
            <th className="task-table-header-cell">Completed</th>
            


          </tr>
        </thead>
        <tbody className="task-table-body">
          {pendingTasks.map((task,index) => (
            <tr key={task.id} className="task-table-row">
              <td className="task-table-cell">{index + 1}</td>
              <td className="task-table-cell">{task.title}</td>
              <td className="task-table-cell">{task.task}</td>
              <td className="task-table-cell">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                 
                  className="task-checkbox"
                />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
      );
    };
    
    
    
