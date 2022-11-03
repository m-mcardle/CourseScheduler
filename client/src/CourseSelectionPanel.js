import { Typography, Grid, Button } from '@mui/material';
import CourseSelectionComponent from './CourseSelectionComponent';

const courseKeys = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

export default function CourseSelectionPanel({ setCourses, allCourses, collisions, courses }) {

  return (
    <Grid container spacing={0} sx={{minWidth: "500px", width: '30%', bgcolor : 'rgba(216,216,216)', borderTopRightRadius: 40, borderBottomRightRadius: 40 }}>
      <Grid item xs={12} bgcolor = 'rgba(205,50,3)' sx={{ borderTopRightRadius: 40, height: "8vh", p: 1, textAlign: 'center' }}>
        <Typography color = "white" align="left" fontSize= "4vh" fontWeight= "bold" >
          UoG Course Selection
        </Typography>
      </Grid>

      {/* loop for adding 5 course components */}
      {courseKeys.map((courseKey) => {
        let collides = false;
        let otherCourses = [];
        const courseData = courses[courseKey];
        if (courseData) {
          for (const i in collisions) {
            if (collisions[i].course1 === courseData['Section Name and Title']) {
              collides = true;
              otherCourses.push(collisions[i].course2);
            }

            if (collisions[i].course2 === courseData['Section Name and Title']) {
              collides = true;
              otherCourses.push(collisions[i].course1);
            }
          }
          otherCourses = [...new Set(otherCourses)];
        }
        return (
          <Grid item xs={12} key={courseKey} style={{ height: "15%", borderRadius: 12.5, backgroundColor: (collides ? 'rgba(205, 50, 3, 0.26)' : '') }}>
            <CourseSelectionComponent course={courseKey} setCourses={setCourses} allCourses={allCourses} collisionCourses={otherCourses}/>
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
          sx={{ height: 40, bgcolor: 'rgba(194,4,48)' }}
          onClick = {() => window.location.reload(false)}
        >
          Clear Courses
        </Button>
      </Grid>
    </Grid>
  );
}
