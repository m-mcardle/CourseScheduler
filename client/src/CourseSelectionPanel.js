import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Modal,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import CourseSelectionComponent from './CourseSelectionComponent';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllCourses, setStoreSemester, setStoreCourses } from './slice';
import { getCollisions } from './Schedule';
import { parseCourses } from './helpers/date';

const courseKeys = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

export default function CourseSelectionPanel({
  setCourses,
  collisions,
  courses,
  scheduleSettings,
  setScheduleSettings
}) {
  const storeSemester = useSelector((state) => state.semester);
  const storeCourses = useSelector((state) => state.courses);

  const [allCourses, setAllCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const [suggestCourses, setSuggCourses] = useState({});

  const [days, setDays] = useState(() => []);
  const [times, setTimes] = useState(() => []);
  const [classes, setClasses] = useState(() => []);
  const [semester, setSemester] = useState(storeSemester);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      var url = 'https://20.232.137.237/api/' + semester + '?';

      for (let day in days) {
        url += '&' + days[day] + '=No';
      }
      for (let time in times) {
        url += '&' + times[time] + '=No';
      }
      for (let classType in classes) {
        url += '&' + classes[classType] + '=No';
      }

      const response = await fetch(url);
      const data = await response.json();
      const newArray = data.map((course) => course['Section Name and Title']);
      setAllCourses(newArray);
      setCoursesData(data);
    }

    fetchData();
  }, [semester, classes, days, times]);

  useEffect(() => {
    const targetCode = courses['Course 1']
      ? courses['Course 1']['Section Name and Title'].split('*')[0]
      : 'ACCT';
    const newCourses = coursesData.filter((course) =>
      course['Section Name and Title'].includes(targetCode)
    );
    const suggestedCourses = {};

    // while we have < 5 courses and there are collisions
    let i = 1;
    let j = 0;
    if (newCourses.length) {
      while (i <= 5 && newCourses[j]) {
        // If current course is not already selected, use a new course in place of a selected one
        if (!courses || !courses[`Course ${i}`]) {
          suggestedCourses[`Course ${i}`] = newCourses[j];
        } else {
          suggestedCourses[`Course ${i}`] = courses[`Course ${i}`];
        }
        const { entries } = parseCourses(suggestedCourses);
        const newCollisions = getCollisions({ appointments: entries });

        if (newCollisions.length === 0) {
          i++;
        } else {
          delete suggestedCourses[`Course ${i}`];
        }
        j++;
      }
    }

    setSuggCourses(suggestedCourses);
  }, [coursesData, courses]);

  const [open, setOpen] = useState(false);

  const handleSuggest = () => {
    dispatch(setStoreCourses({ ...suggestCourses, ...courses }))
    setCourses((state) => ({
      ...state,
      courses: { ...suggestCourses, ...state.courses },
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    dispatch(removeAllCourses());
    setOpen(false);
    window.location.reload(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
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

  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };

  const handleTimes = (event, newTimes) => {
    setTimes(newTimes);
  };

  const handleClasses = (event, newClasses) => {
    setClasses(newClasses);
  };

  const handleSemester = (event, newSemester) => {
    dispatch(setStoreSemester(newSemester));
    setCourses((state) => ({ ...state, courses: { ...storeCourses[newSemester] } }))
    setSemester(newSemester);
  };

  const handleShowExams = (event, newValue) => {
    setScheduleSettings((settings) => ({ ...settings, showExams: newValue }));
  };

  return (
    <Grid
      className="selection-panel"
      container
      spacing={0}
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: 'courseSelectionPanelColor',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Grid
        item
        xs={12}
        bgcolor="rgba(205,50,3)"
        sx={{
          borderTopRightRadius: 40,
          height: '8vh',
          p: 1,
          // textAlign: 'center',
          display: 'flex'
        }}
      >
        <Typography sx={{justifyContent:'center'}} width = '80%' color="white" align="left" fontSize="3vh" fontWeight="bold">
          UoG Course Selection
        </Typography>

        <ToggleButtonGroup
          value={semester}
          onChange={handleSemester}
          exclusive={true}
          unselectable="true"
        >
          <ToggleButton value="f22" aria-label="f22">
            f22
          </ToggleButton>

          <ToggleButton value="w23" aria-label="w23">
            w23
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          flex= {1}
          align="right"
          width = '20%'
          className="filter-button"
          onClick={handleModalOpen}
          sx={{
            mt: 0.5,
            bgcolor: 'rgba(205,50,3)',
            justifyContent: 'center',
            display: 'flex',
            borderRadius: 100,
          }}
        >
          <FilterListIcon sx={{ color: 'white' }} />
        </Button>
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
              Course Selection Helper
            </Typography>
            Exclude Days
            <Grid
              item
              xs={12}
              sx={{ height: '8vh', p: 1, textAlign: 'center' }}
            >
              <ToggleButtonGroup value={days} onChange={handleDays}>
                <ToggleButton value="Monday" aria-label="monday">
                  Monday
                </ToggleButton>

                <ToggleButton value="Tuesday" aria-label="tuesday">
                  Tuesday
                </ToggleButton>

                <ToggleButton value="Wednesday" aria-label="wednesday">
                  Wednesday
                </ToggleButton>

                <ToggleButton value="Thursday" aria-label="thursday">
                  Thursday
                </ToggleButton>

                <ToggleButton value="Friday" aria-label="friday">
                  Friday
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            Exclude Times
            <Grid
              item
              xs={12}
              sx={{ height: '8vh', p: 1, textAlign: 'center' }}
            >
              <ToggleButtonGroup value={times} onChange={handleTimes}>
                <ToggleButton value="Morning" aria-label="morning">
                  Morning
                </ToggleButton>

                <ToggleButton value="Afternoon" aria-label="afternoon">
                  Afternoon
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            Exclude Class Type
            <Grid
              item
              xs={12}
              sx={{ height: '8vh', p: 1, textAlign: 'center' }}
            >
              <ToggleButtonGroup value={classes} onChange={handleClasses}>
                <ToggleButton value="Lecture" aria-label="lecture">
                  Lecture
                </ToggleButton>

                <ToggleButton value="Lab" aria-label="lab">
                  Lab
                </ToggleButton>

                <ToggleButton value="Seminar" aria-label="seminar">
                  Seminar
                </ToggleButton>

                <ToggleButton value="DE" aria-label="de">
                  DE
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            Show Exams
            <Grid
              item
              xs={12}
              sx={{ height: '8vh', p: 1, textAlign: 'center' }}
            >
              <ToggleButtonGroup
                value={scheduleSettings.showExams}
                onChange={handleShowExams}
                exclusive={true}
              >
                <ToggleButton value="true" aria-label="yes">
                  Yes
                </ToggleButton>

                <ToggleButton value="false" aria-label="no">
                  No
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right' }}
            >
              <Button
                className="close-button"
                onClick={handleModalClose}
                variant="contained"
                color="error"
                sx={{
                  mt: 0.5,
                  bgcolor: 'rgba(194,4,48)',
                  justifyContent: 'center',
                  display: 'flex',
                  color: 'white',
                }}
              >
                Close
              </Button>
            </Grid>
          </Box>
        </Modal>
      </Grid>  
      
      {/* loop for adding 5 course components */}
      {courseKeys.map((courseKey) => {
        let collides = false;
        let otherCourses = [];
        const courseData = courses[courseKey];
        if (courseData) {
          for (const i in collisions) {
            if (
              collisions[i].course1 === courseData['Section Name and Title']
            ) {
              collides = true;
              otherCourses.push(collisions[i].course2.split(' ', 1)[0]);
            }

            if (
              collisions[i].course2 === courseData['Section Name and Title']
            ) {
              collides = true;
              otherCourses.push(collisions[i].course1.split(' ', 1)[0]);
            }
          }
          otherCourses = [...new Set(otherCourses)];
        }
        return (
          <Grid
            item
            xs={12}
            key={courseKey}
            style={{
              maxWidth: '97%',
              p: 1,
              height: '15%',
              borderRadius: 12.5,
              backgroundColor: collides ? 'rgba(205, 50, 3, 0.26)' : '',
            }}
          >
            <CourseSelectionComponent
              course={courseKey}
              setCourses={setCourses}
              allCourses={allCourses}
              selectedCourses={courses}
              collisionCourses={otherCourses}
              semester={semester}
            />
          </Grid>
        );
      })}

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
            onClick={handleSuggest}
          >
            Suggest
          </Button>
        </Grid>
      
        <Grid item >

          <Button
            variant="contained"
            color="error"
            sx={{ height: 40, bgcolor: 'rgba(194,4,48)' }}
            onClick={handleClickOpen}
          >
            Clear Courses
          </Button>
          <Dialog
            open={open}
            onClose={handleCloseCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete All Courses'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove all courses from the schedule?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCancel} sx={{ color: 'grey' }}>
                Cancel
              </Button>
              <Button
                onClick={handleCloseConfirm}
                autoFocus
                sx={{ color: 'red' }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
}
