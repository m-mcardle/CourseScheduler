import { useState } from 'react';
import { Grid } from '@mui/material';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export default function App() {
  const [courses, setCourses] = useState({});
  return (
    <div className="App">
      <Grid container p={2} direction={'row'} sx={{ height: '100%' }}>
        <CourseSelectionPanel setCourses={setCourses} />
        <Schedule courses={courses} />
      </Grid>
    </div>
  );
}
