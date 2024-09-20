
import './App.css';
import Alltask from './components/allTaskList';
import Completedtask from './components/completedTask';
import Task from './components/home';
import NavBar from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Pendingtask from './components/pendingTaskList';
import EditTask from './components/updateTask';


function App() {
  return (

    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<Task/>}/>
        <Route path="/alltask" element={<Alltask/>}/>
        <Route path="/completedtask" element={<Completedtask/>}/>
        <Route path="/pendingTask" element={<Pendingtask/>}/>
        <Route path="/edit-task/:task_id" element={<EditTask/>}/>
      </Routes>
    </Router>
  
    
   
 
  );
}

export default App;
