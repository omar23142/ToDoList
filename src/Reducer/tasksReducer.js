
import {useReducer, useEffect} from 'react';
import completedSound from '../components/checked.mp3';

export default function asksReducer(currentTasks, action) {




    switch (action.type) {
        case 'addTask':
           const newTask = {id:crypto.randomUUID(), title:action.payload.input, detailes:'', isCompleted:false }
             let newtasks = [...currentTasks, newTask];
             console.log('newwww', newtasks)
             localStorage.setItem("tasks", JSON.stringify(newtasks));
             return newtasks;

        case 'checked':
             let sound= false;
              let message='task was un Cehecked successfully';
              console.log('hhhhhh', action.payload.id)
              let newTasks = currentTasks.map((task)=> {
                if(task.id === action.payload.id)
                {
                  console.log('ddddddd', task)
                  if(!task.isCompleted)
                    {sound=true;
                     message= 'task was cehecked successfully'
                    }
                 return {...task, isCompleted:!task.isCompleted}
                 
                }
                return task
              });
              action.payload.handleEvent(message)
              localStorage.setItem("tasks", JSON.stringify(newTasks));
              if(sound === true){
                // console.log('soundddddddd')
                const audio = new Audio(completedSound);
                audio.play();
                sound = false;
              // console.log('fffff', sound)}
              }
            
              return ( newTasks);
            
              

        case 'edit':
            let newTasks2 = currentTasks.map((task) => {
            if(task.id === action.payload.taskfromTaskCard.id)
                return {...task, title:action.payload.EditForm.title, detailes:action.payload.EditForm.detailes}
                return task;
            });
             localStorage.setItem("tasks", JSON.stringify(newTasks2));
            console.log('hhhhhhhhh', newTasks2) 
            return newTasks2;
              
        case 'delete':
            let newTasks1 = currentTasks.filter((task)=>{
            return task.id !== action.payload.taskfromTaskCard.id
            });
            localStorage.setItem("tasks", JSON.stringify(newTasks1));
            return (newTasks1);
            

            case 'getLocalStorage':
                
                    let localstorage = JSON.parse(localStorage.getItem('tasks'));
                    if (!localstorage)
                      localstorage=[];
                    // console.log('llllllllll', localstorage);
                     return localstorage
                  
                
            default:
                throw Error('this operation in not exist on the casese')
        }

}