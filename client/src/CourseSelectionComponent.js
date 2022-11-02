import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Box } from '@mui/material';
import React, { useState } from 'react';

export default function CourseSelectionComponent({ course, setCourses }) {
  // setting states
  const [{courseName}, setCourse] = useState({ courseName: '', courseData: [], courseDisplay: 'Search for a course' })

  // function to get course data from api
  async function getCourseData(){
    if (!courseName) { return; }
  
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
    setCourse((state) => ({ ...state, courseDisplay: message, courseData: data }));

    if (data.length === 1) {
      setCourses((state) => ({...state, [course]: data[0] }))
    }
  }

  return (
    // main grid
    <Grid container spacing={0} sx={{ p: 3 }}>
      {/* text field for course input */}
      <Grid item xs={7} sx={{}}>
        <TextField 
          label={course} 
          variant="filled"
          value={courseName}
          fullWidth
          onChange={(event) => setCourse((state) => ({ ...state, courseName: event.target.value }))}
        />
      </Grid>
      <Box sx={{ m: 3 }}></Box>

      {/* button for adding course */}
      <Grid
        item
        xs={1.5}
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

      {/* button for deleting  course */}
      <Grid
        item
        xs={1.5}
        sx={{
          bgcolor: 'red',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 2,
          maxHeight: '75px'
        }}
      >
        <IconButton
          onClick={() => {
            // Remove course from `courses`
            setCourses((state) => {
              delete state[course];
              return  { ...state };
            })

            // Clear input values
            setCourse({ courseName: '', courseData: [], courseDisplay: 'Search for a course' })
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
