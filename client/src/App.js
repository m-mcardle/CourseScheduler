import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';
import { Grid } from '@mui/material';

export default function App() {

  return (
    <div className="App">
      <header className="AppHeader">
        <Grid container m={2} direction={'row'} sx={{ height: '100vh' }}>
          <CourseSelectionPanel />
        </Grid>
      </header>
    </div>
  );
}
