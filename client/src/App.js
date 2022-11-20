import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './themes';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export default function App() {
  const [state, setCourses] = useState({ courses: {}, collisions: []});
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App" style={{display:'flex', flexDirection:'row'}}>
          <CourseSelectionPanel setCourses={setCourses} collisions={state.collisions} courses={state.courses} style={{display:'inline'}}/>
          <Schedule courses={state.courses} setCourses={setCourses} style={{display:'inline', float:'right', width:'60%'}}/>
      </div>
    </ThemeProvider>
  );
}
