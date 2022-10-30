import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Box, TextareaAutosize, Typography} from '@mui/material';
import React, { useState } from 'react';




export default function CourseSelectionComponent({ course }) {
  const [rerender, setRerender] = useState(false);

  let courseName = 'zzzz';
  let courseData = ' ';
  let courseDisplay = 'Search for a course'


  const addCourse = () => {
    console.log("Searching for course: ", courseName)
    getCourseData()
    console.log('done')
    setRerender(!rerender)
    
  };

  const handleCourseChange = event => {
    courseName = event.target.value
  };

  async function getCourseData(){
    const response = await fetch('http://20.168.192.248/api/course/Section%20Name%20and%20Title/'+courseName);
    courseData = await response.json();
    if (!courseData || courseData.length == 0){
      courseDisplay = 'No Course Found'
    } else if (courseData.length > 1) {
      courseDisplay = 'Many courses found please specify search'
    } else {
      console.log('Course Found')
      courseDisplay = JSON.stringify(courseData);
    }
    

  }

  return (
    <Grid container spacing={0} sx={{ p: 3 }}>
      <Grid item xs={3} sx={{}}>
        <TextField 
          label={course} 
          variant="filled" 
          fullWidth 
          onChange={handleCourseChange}
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
        }}
      >
        <IconButton 
          aria-label="add" 
          fullWidth
          onClick={() => addCourse()}
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
        }}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Grid>
      
      <Grid
        item
        xs={6}
        sx={{
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        {/* <TextareaAutosize
          minRows={3}
          placeholder={courseDisplay}
          style={{ width: '100%' }}
          disabled = {true}
        /> */}

        <Typography align="center" variant="h4" component="h4">
          {courseDisplay}
        </Typography>
      </Grid>

    </Grid>
  );
}
