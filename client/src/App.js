import { useState } from 'react';
import { Grid } from '@mui/material';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export default function App() {
  const [courses, setCourses] = useState({});
  return (
    <div className="App">
      <header className="AppHeader">
        <Grid container m={2} direction={'row'} sx={{ height: '100vh' }}>
          <CourseSelectionPanel setCourses={setCourses} />
          <Schedule courses={courses} />
        </Grid>
      </header>
    </div>
  );
}
