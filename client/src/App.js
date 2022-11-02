import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export default function App() {
  const [state, setCourses] = useState({ courses: {}, collisions: []});
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://20.168.192.248/api/courses');
      const data = await response.json();
      const newArray = data.map(course => course['Section Name and Title']);
      setAllCourses(newArray);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Grid container p={2} direction={'row'} sx={{ height: '100%' }}>
        <CourseSelectionPanel setCourses={setCourses} allCourses={allCourses} />
        <Schedule courses={state.courses} setCourses={setCourses}/>
      </Grid>
    </div>
  );
}
