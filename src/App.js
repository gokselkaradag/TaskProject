import './App.css';
import TaskCreate from './Components/TaskCreate';
import TaskList from './Components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [tasks, setTasks] = useState([])

  const createTask = async (title, taskDesc) => {

const response = await axios.post('http://localhost:3004/tasks',{
  title,
  taskDesc
});

    const createdTasks = [
      ...tasks,
      response.data
    ];
    setTasks(createdTasks); 
  };

  const fecthTasks = async()=>{
    const response = await axios.get('http://localhost:3004/tasks');
    setTasks(response.data);
  }

  useEffect(()=>{
    fecthTasks();
  },[])

  const deleteTaskById = async (id) =>{
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task)=>{
      return task.id !==id;
    });
    setTasks(afterDeletingTasks);
  }

  const editTaskById = async (id,updatedTitle,updatedTaskDesc) =>{
    await axios.put(`http://localhost:3004/tasks/${id}`,{
      title:updatedTitle,
      taskDesc:updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task)=>{
      if(task.id === id){
        return {id,title:updatedTitle,taskDesc:updatedTaskDesc}
      }
      return task;
    })
    setTasks(updatedTasks);
  }
  
  return (
    <div className="App">
      <TaskCreate onCreate={createTask}/>
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById}/>
    </div>
  );
}

export default App;
