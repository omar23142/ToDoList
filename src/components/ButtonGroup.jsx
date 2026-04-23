

// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

// export default function BasicButtonGroup() {
//   return (
    // <ButtonGroup variant="contained" aria-label="Basic button group">
    //   <Button>One</Button>
    //   <Button>Two</Button>
    //   <Button>Three</Button>
    //   </ButtonGroup>

    //   <ButtonGroup variant="text" aria-label="Basic button group">
    //     <Button >ALL</Button>
    //     <Button>DONE</Button>
    //     <Button>PROGRESS</Button>

    // </ButtonGroup>

    import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({handleShownclick, shwedTasks}) {
  

  

  function handleClick(e) {
    // console.log('eeeeee', e.target.value)
    handleShownclick(e.target.value)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      size='small'
      value={shwedTasks}
      exclusive
      // onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all" onClick={(e)=>handleClick(e)} >ALL</ToggleButton>
      <ToggleButton value="done" onClick={(e)=>handleClick(e)}>DONE</ToggleButton>
      <ToggleButton value="progress" onClick={(e)=>handleClick(e)}>PROGRESS</ToggleButton>
    </ToggleButtonGroup>
  );
}

//   );
// }
