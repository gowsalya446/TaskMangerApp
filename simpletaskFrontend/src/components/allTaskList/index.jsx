import React from 'react';

import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import "./style.css";
import { useNavigate } from 'react-router-dom';




export default function Alltask(){
const [data,setdata]=useState([]);
const [loading,setloading]=useState(true);
const[error,seterror]=useState(null);
const navigate = useNavigate();




useEffect(()=>{
    const fetchData=async()=>{
     try{
        const response= await fetch('http://127.0.0.1:8000/api/task/');
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const result=await response.json();
        setdata(result);
  
           
    }
    catch(error){
        seterror(error.message)}

        finally{
            setloading(false)
        }
    }
    fetchData();
},[])

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/task/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setdata(data.filter(task => task.id !== id)); 
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
};
if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(data);
  
    return(
       
       <div className="table-container">
      <h2 className="table-title">Task List</h2>
      <table className="task-table">
        <thead className="task-table-header">
          <tr>
            <th className="task-table-header-cell">ID</th>
            <th className="task-table-header-cell">Title</th>
            <th className="task-table-header-cell">Task</th>
            <th className="task-table-header-cell">Completed</th>
            <th className="task-table-header-cell">Edit</th>
            <th className="task-table-header-cell">Delete</th>


          </tr>
        </thead>
        <tbody className="task-table-body">
          {data.map((task,index) => (
            <tr key={data.id} className="task-table-row">
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
              <td className="task-table-cell">
                <button 
                className="red-button"
                onClick={() => navigate(`/edit-task/${task.id}`, { state: { task } })}  >Edit</button>
              </td>
              <td className="task-table-cell"> <button 
              className="trash-icon" 
              onClick={() => handleDelete(task.id)}>
      <CiTrash />
    </button></td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
       )
}