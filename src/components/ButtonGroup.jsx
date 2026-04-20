

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

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      size='small'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">ALL</ToggleButton>
      <ToggleButton value="android">DONE</ToggleButton>
      <ToggleButton value="ios">PROGRESS</ToggleButton>
    </ToggleButtonGroup>
  );
}

//   );
// }
