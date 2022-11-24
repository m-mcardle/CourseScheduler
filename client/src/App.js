import { useState, useMemo, createContext } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from './slice';
import { getDesignTokens } from './themes';
import Schedule from './Schedule';
import CourseSelectionPanel from './CourseSelectionPanel';
import './App.css';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const stateCourses = useSelector((state) => state.courses);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
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
          <CourseSelectionPanel
            setCourses={setCourses}
            collisions={state.collisions}
            courses={state.courses}
            style={{ display: 'inline' }}
            scheduleSettings={scheduleSettings}
            setScheduleSettings={setScheduleSettings}
          />
          <Schedule
            courses={state.courses}
            setCourses={setCourses}
            style={{ display: 'inline', float: 'right', width: '60%' }}
            scheduleSettings={scheduleSettings}
          />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
