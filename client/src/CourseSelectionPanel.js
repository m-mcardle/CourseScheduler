import { Typography, Grid, Button } from '@mui/material';
import CourseSelectionComponent from './CourseSelectionComponet';

const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

export default function CourseSelectionPanel() {
  return (
    <Grid container spacing={0} sx={{ width: '100%' }}>
      <Grid item xs={12} bgcolor="red" sx={{ borderTopRightRadius: 3 }}>
        <Typography align="left" variant="h3" component="h1">
          UoG Course Selection
        </Typography>
      </Grid>
      {courses.map((course) => {
        return (
          <Grid item xs={12}>
            <CourseSelectionComponent course={course} />
          </Grid>
        );
      })}
      <Grid
        item
        xs={12}
        sx={{ p: 2, justifyContent: 'center', display: 'flex' }}
      >
        <Button variant="contained" sx={{ height: 40, bgcolor: 'red' }}>
          Clear Courses
        </Button>
      </Grid>
    </Grid>
  );
}
