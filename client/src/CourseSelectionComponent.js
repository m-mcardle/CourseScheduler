import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Box, TableRow, TableHead, Table, Paper, TableContainer, TableCell, TableBody} from '@mui/material';
import React, { useState } from 'react';


function ParseMeetings(meetingInfo) {
  meetingInfo = meetingInfo.replace(/'/g, '"').replace(/\\n/g, " ");
  const meetings = JSON.parse(meetingInfo)
  return meetings;
}

export default function CourseSelectionComponent({ course, setCourses }) {
  // setting states
  const [{courseName, courseDisplay, courseData}, setCourse] = useState({ courseName: '', courseData: [], courseDisplay: 'Search for a course' })

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
      <Grid item xs={3} sx={{}}>
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

      {/* button for deleting  course */}
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
      
      {/* textarea for displaying data */}
      <Grid
        item
        xs={7}
        sx={{
          justifyContent: 'center',
          display: 'flex',
          marginLeft: "8px"
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>Course Name</TableCell>
              <TableCell>Meeting Times</TableCell>
              <TableCell>Professor</TableCell>
            </TableHead>
            <TableBody>
              {courseData.length === 1
                ? (
                <TableRow>
                  <TableCell>{courseData[0]['Section Name and Title']}</TableCell>
                  <TableCell>
                    {
                    ParseMeetings(courseData[0]['Meeting Information']).map(meeting => (
                      <p style={{ margin: 0 }}>{JSON.stringify(meeting)}</p>
                    ))
                    }
                  </TableCell>
                  <TableCell>{courseData[0]['Faculty']}</TableCell>
                </TableRow>)
                : (
                <TableRow>
                  <TableCell colSpan={3} align="center" style={{ fontStyle: 'italic' }}>{courseDisplay}</TableCell>
                </TableRow>)
              }
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>
    </Grid>
  );
}
