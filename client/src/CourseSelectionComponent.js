import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Box, Typography, TextareaAutosize} from '@mui/material';
import React, { useState } from 'react';


export default function CourseSelectionComponent({ course }) {
  const [courseName, setCourseName] = useState('');
  const [{_, courseDisplay}, setCourse] = useState({ courseData: '', courseDisplay: 'Search for a course' })

  async function getCourseData(){
    const response = await fetch('https://20.168.192.248/api/course/Section%20Name%20and%20Title/'+courseName);
    const data = await response.json();
    let message = '';
    if (!data || data.length === 0){
      message = 'No Course Found'
    } else if (data.length > 1) {
      message = 'Multiple courses found please specify search'
    } else {
      message = JSON.stringify(data);
    }
    setCourse({ courseDisplay: message, courseData: data });
  }

  return (
    <Grid container spacing={0} sx={{ p: 3 }}>
      <Grid item xs={3} sx={{}}>
        <TextField 
          label={course} 
          variant="filled"
          value={courseName}
          fullWidth
          onChange={(event) => setCourseName(event.target.value)}
        />
      </Grid>

      <Box sx={{ m: 3 }}></Box>

      <Grid
        item
        xs={.5}
        sx={{
          bgcolor: 'green',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 2,
          maxHeight: '75px'
        }}
      >
        <IconButton 
          aria-label="add"
          onClick={() => getCourseData()}
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Box sx={{ m: 1 }}></Box>

      <Grid
        item
        xs={.5}
        sx={{
          bgcolor: 'red',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 2,
          maxHeight: '75px'
        }}
      >
        <IconButton
          onClick={() => setCourse({ courseData: '', courseDisplay: 'Search for a course' })}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      
      <Grid
        item
        xs={7}
        sx={{
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <TextareaAutosize
          maxRows={5}
          minRows={5}
          value={courseDisplay}
          style={{ width: '80%' }}
          disabled = {true}
          sx={{ pl: 3 }}
        />

      </Grid>
    </Grid>
  );
}
