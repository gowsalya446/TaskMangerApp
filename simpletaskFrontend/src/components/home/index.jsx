import { useEffect, useState } from "react";

import "./style.css"


export default function Task(){
    
    const[title,setTitle]=useState('')
    const[task,setTask]=useState('')
    const[isCompleted,setIsCompleted]=useState('')
    const [submit, setSubmit] = useState(false); 
    const handleSubmit= async(event)=>{
        event.preventDefault();
        setSubmit(true);
    }
    useEffect(()=>{
        if(submit)
        {
            const data = {
                title: title,
                task: task,
                ...(isCompleted && { is_completed: isCompleted }) 
            };

             const postData=async()=>{
                try{
                    const response = await fetch('http://127.0.0.1:8000/api/task/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    if(response.ok)
                    {
                        const result=await response.json();
                        console.log('sucess:',result);
                        setTitle('');
                        setTask('');
                        setIsCompleted(false);
                        alert("Task created successfully.Please go Alltask list to view")
                    }
                    else{
                        console.error('Error:', response.statusText)
                    }
                }
                catch (error) {
                        console.error('Error:', error);
                        
                    } finally {
                        setSubmit(false);
                }
             };
             postData();
        }
    },[submit]);
    return(
<div className="body">
    

     <div className="formbody">
        <p className="para">Welcome To The Task Manager App</p>
        <div className="form">
            <p>Create Your Task Here</p>
            <form onSubmit={handleSubmit}>
            <div className="field" >
        
            <lable for="title">Title:</lable>
            <input
            className="InputField" 
            id="title" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Title"
            >

            </input>
            </div>
            <div className="field">
            <lable>Task:</lable>
            <input  
            className="InputField" 
            id="task"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            placeholder="Write you task here"></input>
            </div>
            <div className="completed">
            
            <input 
            id="is_completed" 
            type="checkbox"
            checked={isCompleted}
            onChange={(e)=>setIsCompleted(e.target.checked)}
            ></input>
            <lable for="is_completed">completed</lable>
            </div>
            <button className="submitButton">Submit</button>
            </form>
        </div>
       
     </div>
</div>
    );
}