import { Typography } from '@mui/material';
import { CourseSelectionForm } from './CourseSelectionForm';
import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [data, setData] = useState({});

  useEffect( () => {
    async function fetchData() {
      const response = await fetch('http://20.168.192.248:8080/courses');
      setData(await response.json());
    }

    fetchData()
    return () => {}
  }, [])
  
  console.log(data);

  return (
    <div className="App">
      <header className="AppHeader">
        <Typography m={3} align="center" variant="h3" component="h1">
          Course Selection Helper
        </Typography>
        <CourseSelectionForm />
      </header>
    </div>
  );
}

export default App;
