import { Typography } from '@mui/material';
import { CourseSelectionForm } from './CourseSelectionForm';
import './App.css';

function App() {
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
