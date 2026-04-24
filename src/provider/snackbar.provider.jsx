import {useState} from 'react';
import {barContext} from '../context/snackbarContext';
import Snackbars from '../components/Snackbar'
 

    export default function SnackbarProvider({children}) {
    const [open, setOpen] = useState({open:false, message:null});
  
    function handleEvent (message) {
      setOpen({open:true, message:message});
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

        return (
             <barContext.Provider value= {{handleEvent}}>
                {children} 
                <Snackbars open={open} handleClose={handleClose} message={open.message}/>
             </barContext.Provider>
        )
    }
    