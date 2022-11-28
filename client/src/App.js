import { useState, useMemo, createContext } from 'react';
import { ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from './slice';
import { getDesignTokens } from './themes';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const semester = useSelector((state) => state.semester);
  const stateCourses = useSelector((state) => state.courses[semester]);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
 
  const [fullscreen, setFullscreen] = useState(false);
  // const [semester, setSemester] = useState(storeSemester);
 
  const [state, setCourses] = useState({
    courses: stateCourses,
    collisions: [],
  });
  const [scheduleSettings, setScheduleSettings] = useState({
    showExams: "false"
  });
  const [mode, setMode] = useState(darkMode ? 'dark' : 'light');
  const colorMode = {
    // The dark mode switch would invoke this method
    toggleColorMode: () => {
      dispatch(setDarkMode(!darkMode));
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  };
 
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
            {fullscreen ? (
              <div style={{  height: '100vh', minwidth:'100%', width:'100%'}}>
                <Schedule
                  courses={state.courses}
                  setCourses={setCourses}
                  scheduleSettings={scheduleSettings}
                  fullscreen={fullscreen}
                  setFullscreen={setFullscreen}
                  semester={semester}
                />
              </div>    
            ) : (
              <div style = {{ display: "flex"}}>
                <div  style = {{ height: '100vh', minwidth:'30%', width:'30%'}}>
                  <CourseSelectionPanel
                    setCourses={setCourses}
                    collisions={state.collisions}
                    courses={state.courses}
                    scheduleSettings={scheduleSettings}
                    setScheduleSettings={setScheduleSettings}
                  />
                </div>

                <div style={{ height: '100vh', minwidth:'70%', width:'70%'}}>
                  <Schedule
                    courses={state.courses}
                    setCourses={setCourses}
                    scheduleSettings={scheduleSettings}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                    semester={semester}
                  />
                </div>
              </div>  
            )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
