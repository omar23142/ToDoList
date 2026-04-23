
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicButtonGroup from './ButtonGroup';
import ColorToggleButton from './ButtonGroup';
import TaskCard from './TaskCard'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useState, useContext} from 'react';
import completedSound from './checked.mp3';
import { tasksContext } from '../context/tasksContext';

export default function MainComponent() {
  let tasksArray = useContext(tasksContext);
  // console.log('ggggggggggggg',tasksArray);
  const [tasks, setTasks] = useState(tasksArray);
  const [input, setInput] = useState('');
  const [shwedTasks, setShowedTasks] = React.useState('all');

  function handleShownclick(value){
    console.log('shownclick from parent', value)
    setShowedTasks(value);
  }

let completedTasks = tasks.filter((task) =>{
  return task.isCompleted;
});
let unCompletedTasks = tasks.filter((task)=>{
  return !task.isCompleted;
})
// console.log('commmpleteddd', completedTasks);

let showedTasks = tasks;
if(shwedTasks === 'done')
  showedTasks = completedTasks;
else if(shwedTasks === 'progress')
  showedTasks = unCompletedTasks;

let tasksList = showedTasks.map((task)=>{
  return (
  <TaskCard key={task.id} title={task.title} detailes={task.detailes}
    task={task} handleCompletedCheck={handleCompletedCheck} 
    handleDeleteClick={handleDeleteClick}
    handleTaskEdit={handleTaskEdit}/>
  )
});


function handleAddClick (e) {
  const newTask = {id:crypto.randomUUID(), title:input, detailes:'', isCompleted:false }
  let newtasks = [...tasks, newTask];
  console.log('newwww', newtasks)
  setTasks(newtasks);
  localStorage.setItem("tasks", JSON.stringify(newtasks));
  setInput('')
}
function handleCompletedCheck(id) {
  let sound= false;
  console.log('hhhhhh', id)
  let newTasks = tasks.map((task)=> {
    if(task.id === id)
    {
      if(!task.isCompleted)
        sound=true;
     return {...task, isCompleted:!task.isCompleted}
     
    }
    return task
  });

  setTasks( newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  if(sound === true){
    // console.log('soundddddddd')
    const audio = new Audio(completedSound);
    audio.play();
    sound = false;
  // console.log('fffff', sound)}
  }
}
function handleDeleteClick(id) {
  let newTasks = tasks.filter((task)=>{
    return task.id !== id 
  });
  setTasks(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function handleTaskEdit(id,  newTitle='', newDetaile='') {
  
  let newTasks = tasks.map((task) => {
    if(task.id === id)
      return {...task, title:newTitle, detailes:newDetaile}
    return task;
  });
  setTasks(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  console.log('hhhhhhhhh', newTasks)
}

const card = (
  <React.Fragment>
    <CardContent>
      <h2 >
        TASKS
      </h2>
      <hr />
      {/* <BasicButtonGroup style={{size:'small'}}/> */}
      <ColorToggleButton handleShownclick={handleShownclick} shwedTasks={shwedTasks} size='xs'/>
      {/* <TaskCard /> */}
      {tasksList}
    </CardContent>
    <Grid container spacing={2}>
      <Grid size={8} style={{background:''}}>
    <TextField id="outlined-basic" 
    label="ADD NEW TASK" variant="outlined"
     style={{width:'100%', height:'100%', marginLeft:'15px'}}
     value={input}
     onChange={(e)=>{setInput(e.target.value)}}
       />
  </Grid>
      <Grid size={4} >
   <Button variant="contained" 
   style={{width:'90%', height:'100%', marginRight:'12px'}}
   onClick={(e)=>{handleAddClick(e)}}
    disabled={input.length <= 0 ? true: false}
   >ADD</Button>
  </Grid>
    
  
  </Grid>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

  // let localstorage = JSON.parse(localStorage.getItem('tasks'));
  // console.log('llllllllll', localstorage)
  // setTasks(localstorage)  // this will give infinit loop because the rerender the same component and try to reset ......

  React.useEffect(()=> {
    console.log('callling useEffect')
    let localstorage = JSON.parse(localStorage.getItem('tasks'));
    if (!localstorage)
      localstorage=[];
    console.log('llllllllll', localstorage);
    setTasks(localstorage)  
  }, []);

  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{background:'', maxHeight:'80vh', overflow:'scroll', marginTop:'100px'}}>{card}</Card>
    </Box>
  );
}
