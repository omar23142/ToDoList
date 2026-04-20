

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {useState} from 'react';
import completedSound from './checked.mp3';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TaskCard({title, detailes='', handleCompletedCheck, handleDeleteClick, handleTaskEdit, task}) {

  // console.log('tttttttt', title, detailes)
let done = task.isCompleted;
// console.log('kkkkkk', done)

const [Deleteopen, setdeleteOpen] = React.useState(false);

  const handleDeleteClickOpen = () => {
    setdeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setdeleteOpen(false);
  };

  const handleDeleteAgree = () => {
    handleDeleteClick(task.id)
    setdeleteOpen(false);
  };

  const [EditForm, setEditForm] = React.useState({EditOpenForm:false, title:task.title, detailes:task.detailes});
  function handleEditOpen() {
    setEditForm({...EditForm, EditOpenForm:true});
  }
  function handleEditClose() {
    setEditForm({...EditForm, EditOpenForm:false});
  }
  function handleSubmit(event) {
    event.preventDefault();
    handleTaskEdit(task.id, EditForm.title, EditForm.detailes)
    setEditForm({...EditForm, EditOpenForm:false});
  }

const card = (
  <React.Fragment>
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
    <CardContent style={{height:'60px'}}>
       <Grid container spacing={2}>
        <Grid size={1} style={{background:'', justifyContent:'center', display:'flex', alignItems:'center'}}>
         
          { done ?  (
            <RadioButtonCheckedIcon className='uniconButon' 
            sx={{ marginRight:'10px', color:'#8bc34a', background:'#8bc34a', border:'solid #8bc34a 3px', borderRadius:'50%'

             }}
             checked={done}
              onClick={()=>handleCompletedCheck(task.id)}
             />) :  ( 
             <RadioButtonUncheckedIcon className='iconButon' 
             sx={{ marginRight:'10px', color:'#8bc34a', background:'white', border:'solid #8bc34a 3px', borderRadius:'50%'
              }}
              checked={done}
              onClick={()=>handleCompletedCheck(task.id)}
              />) }
        </Grid>
        <Grid size={7} style={{background:''}}>
          <Typography variant="h7" component="div" sx={{textAlign:'left',fontSize:'22px', textDecoration: done ? 'line-through' : 'none' }}>
            {title}
          </Typography>
          <Typography gutterBottom sx={{ color: 'white', fontSize: 12, textAlign:'left', textDecoration: done ? 'line-through' : 'none'  }}>
            {detailes}
          </Typography>

        </Grid>
        <Grid size={4} sx={{justifyContent:'center', display:'flex', alignItems:'center'}}>
         
          <ModeEditTwoToneIcon className='iconButon'
           sx={{ marginLeft:'10px',color:'#1769aa', background:'white', border:'solid #1769aa 3px', borderRadius:'50%'}} 
           onClick={handleEditOpen}/>
          
          <DeleteOutlineTwoToneIcon className='iconButon' 
          sx={{ marginLeft:'10px', color:'#b23c17', background:'white', border:'solid #b23c17 3px', borderRadius:'50%'}}
          onClick={handleDeleteClickOpen}
          /> 
          
        </Grid>
        </Grid>
      
      
    </CardContent>
    
  </React.Fragment>
);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card className='task' variant="outlined" style= {{background:'#1b37d6', color:'white', marginTop:'8px'}}> {card}</Card>
    </Box>
  );
}
