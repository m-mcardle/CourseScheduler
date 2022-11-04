import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './themes';
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
    <ThemeProvider theme={darkTheme}>
      <div className="App" style={{display:'flex', flexDirection:'row'}}>
          <CourseSelectionPanel setCourses={setCourses} allCourses={allCourses} collisions={state.collisions} courses={state.courses} style={{display:'inline'}}/>
          <Schedule courses={state.courses} setCourses={setCourses} style={{display:'inline', float:'right', width:'60%'}}/>
      </div>
    </ThemeProvider>
  );
}
