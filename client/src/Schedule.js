import { 
  useEffect, 
  useState,
  useContext,
  createRef
} from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  WeekView,
  Resources,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { 
  Typography, 
  Grid,
  Box,
  Modal,
  Button
} from '@mui/material';
import { currentDate, parseCourses } from './helpers/date';
import { Room } from '@mui/icons-material';
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";

// import { useDispatch, useSelector } from 'react-redux';
// import { removeAllCourses, setStoreSemester } from './slice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { ColorModeContext } from './App';

import {
  IconButton,
  useTheme,
} from '@mui/material';


dayjs.extend(isBetween);


export const Content = (({
  appointmentData, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} textAlign="center">
        <Room />
      </Grid>
      <Grid item xs={10}>
        {appointmentData.classFind
          ? <a href={`https://classfind.com/guelph/room/${appointmentData.classFind}`}>{appointmentData.location}</a>
          : <span>{appointmentData.location}</span>
        }
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

export default function Schedule({ courses, setCourses, scheduleSettings, fullscreen, setFullscreen }) {

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [scheduleRef] = useState(createRef());

  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = () => {setModalOpen(true)};
  const handleModalClose = () => setModalOpen(false);



  const fullscreenClick = () => {
    if (fullscreen == true) {
      setFullscreen(false);
    } else {
      setFullscreen(true);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const [state, setState] = useState({
    appointments: [],
    resources: [
      {
        fieldName: 'course',
        title: 'Course',
        instances: [],
      },
    ],
  });

  // Hook for parsing selected courses' meetings
  useEffect(() => {
    const { entries, instances } = parseCourses(courses, scheduleSettings.showExams);
  
    setState((state) => ({
      ...state,
      appointments: entries,
      resources: [
        {
          fieldName: 'course',
          title: 'Course',
          instances,
        },
      ],
    }));
  }, [courses, scheduleSettings.showExams]);

  // Hook for detecting collisions
  useEffect(() => {
    const collisions = [];
    const dates = [];
    for (const i in state.appointments) {
      const appointment = state.appointments[i];
      const start = dayjs(appointment.startDate);
      const end = dayjs(appointment.endDate);

      for (const j in dates) {
        // Shift times by a second to ensure that matching start/end times count as collisions
        const newStart = start.add(1, 'second');
        const newEnd = end.subtract(1, 'second');
        if (
          newStart.isBetween(dates[j].start, dates[j].end) ||
          newEnd.isBetween(dates[j].start, dates[j].end)
        ) {
          collisions.push({
            course1: appointment.course,
            course2: state.appointments[j].course,
          });
        }
      }

      dates[i] = {
        start,
        end,
      };
    }
    setCourses((state) => ({ ...state, collisions }));
  }, [state.appointments, setCourses]);

  return (
    <div className="schedule" style={{width:'100%', height: '100vh' }}>
      
      <div 
        style={{
          position:'fixed',
          width:'40px',
          height:'40px',
          bottom:'40px',
          right:'40px',
          backgroundColor:'#FFCC00',
          color:'#FFF',
          borderRadius:'50px',
          align:'center',
          zIndex: '100'
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleModalOpen}
        >
            <FileDownloadIcon />
        </IconButton>
      </div>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            color="rgba(205,50,3)"
            align="center"
            fontSize="4vh"
            fontWeight="bold"
            paddingBottom="10px"
          >
            Export Schedule
          </Typography>

          <Grid
            item 
            xs={12}
            sx={{ p: 2, justifyContent: 'center', display: 'flex' }}
            container spacing = {2}
          >
            <Grid item >
              <Button
                variant="contained"
                color="error"
                sx={{ height: 40, bgcolor: 'rgba(194,4,48)' }}
                onClick = {() => exportComponentAsPNG(scheduleRef)}
              >
                PNG
              </Button>
            </Grid>
            
            <Grid item >
              <Button
                variant="contained"
                color="error"
                sx={{ height: 40, bgcolor: 'rgba(194,4,48)' }}
                onClick={() => exportComponentAsJPEG(scheduleRef)}
              >
                JPEG
              </Button>
            </Grid>

            <Grid item >
              <Button
                variant="contained"
                color="error"
                sx={{ height: 40, bgcolor: 'rgba(194,4,48)' }}
                onClick={() => exportComponentAsPDF(scheduleRef)}
              >
                PDF
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Grid sx={{width:'100%'}}>
        
        <IconButton
          align="center" 
          display = 'inline-block' 
          width='5%' 
          color="inherit"
          onClick={fullscreenClick}
          style = {{marginLeft: '25px'}}
        >
          {fullscreen ? (
            <FullscreenExitIcon />
          ) : (
            <FullscreenIcon />
          )}
        </IconButton>

        <Typography display = 'inline-block' width='90%' color="grey" fontSize="4vh" fontWeight="bold"  align = 'center'>
          Course Schedule
        </Typography>
        
        <IconButton display = 'inline-block' width='5% ' onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Grid>

      <Paper style={{ height: '92vh', width: '100%' }} ref={scheduleRef}>
        <Scheduler data={state.appointments}>
          <ViewState currentDate={currentDate} />
          <WeekView startDayHour={8} endDayHour={22} excludedDays={[0, 6]} />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            contentComponent={Content}
          />
          <Resources data={state.resources} mainResourceName={'course'} />
        </Scheduler>
      </Paper>
    </div>
  );
}
