import React from 'react'
import './movieCard.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { grey } from '@mui/material/colors';

const AddMovieCard = () => {
  return (
    <div className='addmovie-card'>
        <ControlPointIcon sx={{ fontSize: 130, color: grey[600] }}/>
    </div>
  )
}

export default AddMovieCard