import "./styles.css";
import { Link } from 'react-router-dom';

export default function NavBar(){
    return(
        <div>
            <div className="header">
      <div className="navigation-links">
          <p className="head">Task Mananger</p>
          <nav>
             <ul className="links-g">
                  <li><Link className="none-g"to="/">Home</Link></li>
                  <li><Link className="none-g" to="/alltask">All Task</Link></li>
                  <li><Link className="none-g"to="/pendingTask">Pending task</Link></li>
                  <li><Link className="none-g" to="/completedtask">Completed Task</Link></li>
                  
              </ul>
          </nav>
      </div>
      
  </div>
  
        </div>
      

        

       
    );
}