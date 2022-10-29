import { Typography, Grid } from '@mui/material';
import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';



const CourseDataPanel = () => {
  return (

    <Grid container spacing={0} sx={{ width:'65%'}}>
    
      <Grid item xs={12}>
        <Typography align="center" variant="h3" component="h1">Data</Typography>
      </Grid>

      
      <Grid item xs={12}  sx={{justifyContent: 'center' , display: 'flex'}}>
        <TextareaAutosize  minRows={3} aria-label="empty textarea" placeholder="Empty" style={{ width: "80%" }}/>
      </Grid>

      <Grid item xs={12}  sx={{justifyContent: 'center' , display: 'flex'}}>
        <TextareaAutosize  minRows={3} aria-label="empty textarea" placeholder="Empty" style={{ width: "80%" }}/>
      </Grid>

      <Grid item xs={12}  sx={{justifyContent: 'center' , display: 'flex'}}>
        <TextareaAutosize  minRows={3} aria-label="empty textarea" placeholder="Empty" style={{ width: "80%" }}/>
      </Grid>

      <Grid item xs={12}  sx={{justifyContent: 'center' , display: 'flex'}}>
        <TextareaAutosize  minRows={3} aria-label="empty textarea" placeholder="Empty" style={{ width: "80%" }}/>
      </Grid>

      <Grid item xs={12}  sx={{justifyContent: 'center' , display: 'flex'}}>
        <TextareaAutosize  minRows={3} aria-label="empty textarea" placeholder="Empty" style={{ width: "80%" }}/>
      </Grid>


    </Grid>
  );
}

export default CourseDataPanel;