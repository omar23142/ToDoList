import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import {theme} from './muiTheme';

import Container from '@mui/material/Container';
import {tasksContext} from './context/tasksContext'
import MainComponent from './components/MainComponent';



function App() {
  // console.log('fontttt', theme);

  let tasks = [
  {id:crypto.randomUUID(), title:'finish react course', detailes:'before end of month', isCompleted:false},
  {id:crypto.randomUUID(), title:'finish react course', detailes:'before end of this month', isCompleted:false},
  {id:crypto.randomUUID(), title:'finish my protofilo', detailes:'before end of may month', isCompleted:false},
];

  return (
    
    <ThemeProvider theme = {theme} >
      <tasksContext.Provider value= {tasks}>
    <div className="App" style={{display:'flex', justifyContent:'center', alignItems:'center', heigh:'100vh', background:'rgb(19, 31, 44)'}}>
      <Container maxWidth="xs">
        <MainComponent />
      </Container>
    </div>
    </tasksContext.Provider>
    </ThemeProvider>
    
  );
}

export default App;
