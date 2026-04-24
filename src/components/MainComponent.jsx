
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
import {useState, useContext, useMemo} from 'react';
import completedSound from './checked.mp3';
import { tasksContext } from '../context/tasksContext';
// import completedSound from './checked.mp3';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {barContext} from '../context/snackbarContext'


export default function MainComponent() {
  let tasksArray = useContext(tasksContext);
  // console.log('ggggggggggggg',tasksArray);
  const [tasks, setTasks] = useState(tasksArray);
  const [input, setInput] = useState('');
  const [shwedTasks, setShowedTasks] = React.useState('all');

  const [Deleteopen, setdeleteOpen] = React.useState(false);

  const handleDeleteClickOpen = (task) => {
    setTaskfromTaskCard(task);
    setdeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setdeleteOpen(false);
  };

  const handleDeleteAgree = () => {
    console.log('in handleDeleteAgree',taskfromTaskCard)
    handleDeleteClick(taskfromTaskCard.id)
    setdeleteOpen(false);
    handleEvent('task was deleted successfully')
  };

  const [taskfromTaskCard, setTaskfromTaskCard] = useState({});
  const [EditForm, setEditForm] = React.useState({EditOpenForm:false, title:taskfromTaskCard.title, detailes:taskfromTaskCard.detailes});
  // console.log('barc', barContext)
  const  {handleEvent} = useContext(barContext)
  // console.log('Arraaaaaaaaaaay', handleEvent);
  //////////////////////////////////////////////////////////
    function handleEditOpen(task) {
      console.log('tasssssskkkkk',task.id, task.title, task.detailes)
      setTaskfromTaskCard(task)
      setEditForm({EditOpenForm:true, title:task.title, detailes:task.detailes});
    }
    function handleEditClose() {
      setEditForm({...EditForm, EditOpenForm:false});
    }
    function handleSubmit(event) {
      event.preventDefault();
      handleTaskEdit(taskfromTaskCard.id, EditForm.title, EditForm.detailes)
      setEditForm({...EditForm, EditOpenForm:false});
      handleEvent('task was edited successfully')
    }



  function handleShownclick(value){
    console.log('shownclick from parent', value)
    setShowedTasks(value);
  }

let completedTasks = useMemo(()=>{
  return tasks.filter((task) =>{
  // console.log('in the completedTasks for loopppppppppppppppppp')
  return task.isCompleted;
});
},[tasks])

let unCompletedTasks = useMemo(()=>{
  return tasks.filter((task)=>{
  //  console.log('in the NOT completedTasks for loopppppppppppppppppp')
  return !task.isCompleted;
})
},[tasks]);
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
    handleTaskEdit={handleTaskEdit}
    handleEditOpen={handleEditOpen}
    handleDeleteClickOpen={handleDeleteClickOpen}/>
    
  )
});


function handleAddClick (e) {
  const newTask = {id:crypto.randomUUID(), title:input, detailes:'', isCompleted:false }
  let newtasks = [...tasks, newTask];
  console.log('newwww', newtasks)
  setTasks(newtasks);
  localStorage.setItem("tasks", JSON.stringify(newtasks));
  setInput('')
  handleEvent('task was added successfully')
}
function handleCompletedCheck(id) {
  let sound= false;
  let message='task was un Cehecked successfully';
  console.log('hhhhhh', id)
  let newTasks = tasks.map((task)=> {
    if(task.id === id)
    {
      if(!task.isCompleted)
        {sound=true;
         message= 'task was cehecked successfully'
        }
     return {...task, isCompleted:!task.isCompleted}
     
    }
    return task
  });

  setTasks( newTasks);

  handleEvent(message)
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
    // console.log('llllllllll', localstorage);
    setTasks(localstorage)  
  }, []);

  
  return (
    <>
    
    {/* EDITMODAL */}
    <Dialog open={EditForm.EditOpenForm} onClose={handleEditClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit this Task Pleas inter the new Title and new Detailes
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form" >
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="NEW TITLE"
              type="text"
              fullWidth
              variant="standard"
              value={EditForm.title}
              onChange={(e)=>{setEditForm({...EditForm, title:e.target.value})}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="detailes"
              label="NEW DETAILES"
              type="text"
              fullWidth
              variant="standard"
              value={EditForm.detailes}
              onChange={(e)=>{setEditForm({...EditForm, detailes:e.target.value})}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button type="submit" form="subscription-form" onSubmit={handleSubmit}>
            EDIT
          </Button>
        </DialogActions>
      </Dialog>
    {/* ====EDITMODAL ====*/}

    {/* deleteModal */}
      <Dialog
        open={Deleteopen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want Delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleDeleteAgree}>Agree Delete It</Button>
        </DialogActions>
      </Dialog>
     {/* ===deleteModal=== */}


    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{background:'', maxHeight:'80vh', overflow:'scroll', marginTop:'100px'}}>{card}</Card>
    </Box>
    </>
  );
}
