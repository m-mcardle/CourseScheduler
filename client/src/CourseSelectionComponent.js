import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState } from 'react';

const filterOptions = createFilterOptions({
  limit: 8,
});

export default function CourseSelectionComponent({ course, setCourses, allCourses, collisionCourses }) {
  // setting states
  const [{courseName}, setCourse] = useState({ courseName: null, courseData: [], courseDisplay: 'Search for a course' });

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
      setCourses((state) => ({...state, courses: { ...state.courses, [course]: data[0] } }))
    }
  }

  return (
    // main grid
    <Grid container  sx={{ p: 1 ,alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      {/* text field for course input */}
      <Grid item xs={8} sx={{ mx: 1.5, bgcolor: 'rgba(255,255,255)', borderRadius: 1}}>
        <Autocomplete
          options={allCourses}
          filterOptions={filterOptions}
          value={courseName}
          onChange={(_, value) => setCourse((state) => ({ ...state, courseName: value }))}
          renderInput={(params) => (
            <TextField
              color = "main"
              focused
              label={course} 
              variant="filled"
              fullWidth
              {...params}
            />
          )}
        />
      </Grid>
      

      {/* button for adding course */}
      <Grid
        item
        xs={1}
        sx={{
          mx: 1.5,
          bgcolor: 'rgba(255,204,0)',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 100
        }}
      >
        <IconButton 
          aria-label="add"
          onClick={() => getCourseData()}
          sx={{  color: 'white' }}
        >
          <AddIcon sx={{  height: "30px", width: "30px"}} />
        </IconButton>
      </Grid>

      {/* button for deleting  course */}
      <Grid
        item
        xs={1}
        sx={{
          mx: 1.5,
          bgcolor: 'rgba(194,4,48)',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 100
        }}
      >
        <IconButton
          sx={{  color: 'white' }}
          onClick={() => {
            // Remove course from `courses`
            setCourses((state) => {
              delete state.courses[course];
              return  { ...state, courses:  { ...state.courses } };
            })

            // Clear input values
            setCourse({ courseName: null, courseData: [], courseDisplay: 'Search for a course' })
          }}
        >
          <DeleteIcon sx={{  height: "30px", width: "30px"}} />
        </IconButton>
      </Grid>
      {collisionCourses.length
        ?
        <Grid sx={{ width: '100%' }}>
          <p style={{ fontSize: '10px'}}>Collision with:</p>
          {
          collisionCourses.map(otherCourse =>
            (<p className='Note'>{otherCourse}</p>)
          )}
        </Grid>
        : undefined
      }
    </Grid>
  );
}
