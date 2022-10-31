import { Typography, Grid, Button } from '@mui/material';
import CourseSelectionComponent from './CourseSelectionComponent';

const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

export default function CourseSelectionPanel({ setCourses }) {

  return (
    <Grid container spacing={0} sx={{ width: '100%' }}>
      <Grid item xs={12} bgcolor="red" sx={{ borderTopRightRadius: 3 }}>
        <Typography align="left" variant="h3" component="h1">
          UoG Course Selection
        </Typography>
      </Grid>

      {/* loop for adding 5 course components */}
      {courses.map((course) => {
        return (
          <Grid item xs={12} key={course}>
            <CourseSelectionComponent course={course} setCourses={setCourses}/>
          </Grid>
        );
      })}
      <Grid
        item
        xs={12}
        sx={{ p: 2, justifyContent: 'center', display: 'flex' }}
      >
        <Button 
          variant="contained" 
          sx={{ height: 40, bgcolor: 'red' }}
          onClick = {() => window.location.reload(false)}
        >
          Clear Courses
        </Button>
      </Grid>
    </Grid>
  );
}
