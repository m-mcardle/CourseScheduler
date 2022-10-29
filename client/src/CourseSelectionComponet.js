import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, IconButton, Box } from '@mui/material';
import React from 'react'



const CourseSelectionComponent = ({course}) => {
  return (
    <Grid container spacing={0}  sx={{ p: 3}}>
      
      <Grid item xs={8} sx={{}}>
        <TextField id="outlined-basic" label = {course} variant="outlined" fullWidth />
      </Grid>
      
      <Box sx={{m:3 }}></Box>

      <Grid item xs={1}  sx={{bgcolor: "green",justifyContent: 'center' , display: 'flex', borderRadius: 2}}  >
        <IconButton aria-label="add" fullWidth >
          <AddIcon />
        </IconButton>
      </Grid>

      <Box sx={{m: 1 }}></Box>

      <Grid item xs={1}  sx={{ bgcolor: "red", justifyContent: 'center' , display: 'flex', borderRadius: 2}} >
          <IconButton >
            <DeleteIcon/>
          </IconButton>

      </Grid>

    </Grid>
  );
}

export default CourseSelectionComponent;