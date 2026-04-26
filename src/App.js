import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import {theme} from './muiTheme';

import Container from '@mui/material/Container';
import {tasksContext} from './context/tasksContext'
import MainComponent from './components/MainComponent';
import Snackbars from './components/Snackbar'
import {useState, useReducer} from 'react'
import {barContext} from './context/snackbarContext';
import SnackbarProvider from './provider/snackbar.provider';
import {TasksProvider} from './context/tasksContext';


function App() {
  // console.log('fontttt', theme);



 
  // console.log('AAAAAAAAAAAAAAp', SnackbarProvider)
  return (
    
    <ThemeProvider theme = {theme} >
      {/* <tasksContext.Provider value= {tasks}> */}
      <TasksProvider>
      <SnackbarProvider 
      >
        <div className="App" style={{display:'flex', justifyContent:'center', alignItems:'center', heigh:'100vh', background:'rgb(19, 31, 44)'}}>
          <Container maxWidth="xs">
            <MainComponent />
          </Container>
        </div>
        {/* <Snackbars open={open} handleClose={handleClose} message={open.message}/> */}
    </SnackbarProvider>
    {/* </tasksContext.Provider> */}
    </TasksProvider>
    
    </ThemeProvider >
    
  );
}

export default App;
