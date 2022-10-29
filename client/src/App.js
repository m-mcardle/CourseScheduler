import CourseSelectionPanel from './CourseSelectionPanel';
import CourseDataPanel from './CourseDataPanel';
import { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@mui/material';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://20.168.192.248/api/courses');
      setData(await response.json());
    }

    fetchData();
    return () => {};
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="AppHeader">
        <Grid container m={2} direction={'row'} sx={{ height: '100vh' }}>
          <CourseSelectionPanel />
          <CourseDataPanel />
        </Grid>
      </header>
    </div>
  );
}
