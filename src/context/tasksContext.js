

import {createContext, useReducer, useContext} from 'react';
import tasksReducer from '../Reducer/tasksReducer';

export const tasksContext = createContext([]);

  let tasksArray = [
  {id:crypto.randomUUID(), title:'finish react course', detailes:'before end of month', isCompleted:false},
  {id:crypto.randomUUID(), title:'finish react course', detailes:'before end of this month', isCompleted:false},
  {id:crypto.randomUUID(), title:'finish my protofilo', detailes:'before end of may month', isCompleted:false},
];
 
export const ReducerProvider = createContext({});

export function TasksProvider  ({children}) {
    const [tasks, dispatch] = useReducer(tasksReducer, [])
    console.log('pppppppp',tasks)
    return(
        
        <tasksContext.Provider value= {tasksArray}>
            <ReducerProvider.Provider value={{tasks, dispatch}}>
            {children}
            </ReducerProvider.Provider>
        </tasksContext.Provider>
        
    )

}

export const useTasksProvider = ()=> {
    return useContext(ReducerProvider);
}