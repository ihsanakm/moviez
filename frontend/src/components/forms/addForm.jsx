import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';
import './updateForm.scss'
import { Chip, FormControl, Input, InputLabel } from '@mui/material';

const AddForm = ({ setIsAddForm,addMovieData}) => {
    const [genress, setGenress] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
  
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await axios.get(apiConfig.baseUrl + 'genre/movie/list', {
            params: {
              api_key: apiConfig.apiKey,
            },
          });
          setGenress(response.data.genres);
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      };
  
      fetchGenres();
    }, []);
  
    const formik = useFormik({
      initialValues: {
        title: '',
        overview: '',
        genres: genress,
        id: '',
        date:''
      },
      validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
        overview: Yup.string().required('Overview is required'),
        genres: Yup.array().min(1, 'At least one genre is required'),
        id:Yup.number().required('ID is required'),
        date:Yup.date().required('Pick up a Date')
      }),
      onSubmit: async (values) => {
        try {
          const response = await axios.post('http://localhost:3000/my-movie/add', values,{ withCredentials: true });
          addMovieData(response);
          setIsAddForm(false)
        } catch (error) {
          console.error('Error submitting movie:', error);
        }
      },
    });
  
    const handleClick = () => {
        setIsAddForm(false)
    };

 return (
  <>
    <form className='updateForm' onSubmit={formik.handleSubmit}>
    <TextField
        fullWidth
        id="id"
        name="id"
        label="ID"
        value={formik.values.id}
        onChange={formik.handleChange}
        error={formik.touched.id && Boolean(formik.errors.id)}
        helperText={formik.touched.id  && formik.touched.id }
        inputProps={{ type: 'number'}}      />
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="date"
        label="Release Date"
        type="date"
        defaultValue="2024-03-14"
        value={formik.values.date}
        onChange={formik.handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        id="overview"
        name="overview"
        label="Overview"
        multiline
        rows={4}
        value={formik.values.overview}
        onChange={formik.handleChange}
        error={formik.touched.overview && Boolean(formik.errors.overview)}
        helperText={formik.touched.overview && formik.errors.overview}
      />
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel id="genres-label" htmlFor="genres">
            Genres
          </InputLabel>
          <Select
            labelId="genres-label"
            id="genres"
            name="genres"
            multiple
            value={formik.values.genres}
            onChange={formik.handleChange}
            onClose={() => setIsOpen(false)}
            onClick={() => setIsOpen(false)}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value.id} label={value} style={{ marginRight: 5 }} />
                ))}
              </div>
            )}
            error={formik.touched.genres && Boolean(formik.errors.genres)}
          >
            {genress.map((genre) => (
              <MenuItem key={genre.id} value={genre.name}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Add Movie
        </Button>
        <Button variant="outlined" color="primary" type="submit" style={{marginLeft:'10px'}} onClick={handleClick}>
          Cancel
        </Button>

      </Box>
    </form>
    </>
  );
};

export default AddForm;
