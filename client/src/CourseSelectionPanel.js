import { Typography, Grid, Button } from '@mui/material';
import  CourseSelectionComponent  from './CourseSelectionComponet';
import React from 'react'



const CourseSelectionPanel = () => {
  return (

    <Grid container spacing={0} sx={{width:'35%' }}>
      
      <Grid item xs={12} bgcolor= "red" sx={{ borderTopRightRadius: 3 }}>
        <Typography align="left" variant="h3" component="h1">UoG Course Selection</Typography>
      </Grid>
  
      <Grid item xs={12} >
        <CourseSelectionComponent course = 'Course 1'/>
      </Grid>

      <Grid item xs={12} >
        <CourseSelectionComponent course = 'Course 2'/>
      </Grid>

      <Grid item xs={12} >
        <CourseSelectionComponent course = 'Course 3'/>
      </Grid>

      <Grid item xs={12} >
        <CourseSelectionComponent course = 'Course 4'/>
      </Grid>

      <Grid item xs={12} >
        <CourseSelectionComponent course = 'Course 5'/>
      </Grid>

      <Grid item xs={12} sx={{p: 2, justifyContent: 'center' , display: 'flex'}} >
        <Button variant="contained" sx={{height: 40, bgcolor: "red"}}>Clear Courses</Button>
      </Grid>
    </Grid>
  );
}

export default CourseSelectionPanel;