import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../speedDialButton/speedDialButton.scss'
import axios from 'axios';
import Box from '@mui/material/Box';


 



export default function SpeedDialButton({id,handleDelete,selectedMovie}) {

  const actions = [
    { icon: <CreateIcon />, name: 'Update',onClick:()=>selectedMovie(id) },
    { icon: <DeleteIcon />, name: 'Delete', onClick:()=>handleDelete(id) },
  ];
  

  return (
    <Box sx={{ height: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 0, right: 10, color:'red', borderRadius:0.5}}
        icon={<InfoOutlinedIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{ backgroundColor:'#FF0000'}}
            onClick={action.onClick}

          />
        ))}
      </SpeedDial>
    </Box>
  );
}