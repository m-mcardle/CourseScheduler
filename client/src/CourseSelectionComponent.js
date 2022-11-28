import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Grid,
  TextField,
  IconButton,
  Button,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse, removeCourse } from './slice';

const filterOptions = createFilterOptions({
  limit: 8,
});

export default function CourseSelectionComponent({
  course,
  setCourses,
  allCourses,
  collisionCourses,
  semester,
  selectedCourses,
}) {
  // setting states
  const [courseName, setCourse] = useState(
    selectedCourses[course]
      ? selectedCourses[course]['Section Name and Title']
      : null
  );
  const [courseData, setCourseData] = useState(
    selectedCourses[course] ? selectedCourses[course] : {}
  );
  const [isHovering, setHovering] = useState(false);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const updateCourseState = () => {
    setCourse(
      selectedCourses[course]
        ? selectedCourses[course]['Section Name and Title']
        : null
    );
    setCourseData(selectedCourses[course] ? selectedCourses[course] : {});
  }

  // Reset course each time we are injecting a new course through `selectedCourses`
  useEffect(() => {
    // Don't update if we are just previewing a course
    if (!isHovering) {
      updateCourseState();
    }
  }, [selectedCourses[course]]);

  // Reset course each time semester changes
  useEffect(() => {
    updateCourseState();
  }, [semester]);

  const handleClickOpen = () => {
    if (courseName !== null) {
      setOpen(true);
    }
  };

  const deleteCourse = () => {
    dispatch(removeCourse({ i: course }));
    setOpen(false);

    // Remove course from `courses`
    setCourses((state) => {
      delete state.courses[course];
      return { ...state, courses: { ...state.courses } };
    });

    // Clear input values
    setCourse(null);
    setCourseData({});
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  // function to get course data from api
  async function getCourseData(courseToFetch = courseName) {
    if (!courseToFetch) {
      return;
    }

    const response = await fetch(
      `https://20.168.192.248/api/course/Section%20Name%20and%20Title/${courseToFetch}?${semester}`
    );
    const data = await response.json();
    return data;
  }

  async function selectCourse(newValue) {
    setCourse(newValue);
    const data = await getCourseData(newValue);

    if (!data) {
      setCourseData({});
    } else {
      dispatch(addCourse({ course: data[0], i: course }));
      setCourseData(data[0]);
      setCourses((state) => ({
        ...state,
        courses: {
          ...state.courses,
          [course]: { ...data[0] },
        },
      }));
    }
  }

  async function previewCourse(newValue) {
    const newData = await getCourseData(newValue);
    setCourses((state) => ({
      ...state,
      courses: {
        ...state.courses,
        [course]: { ...newData[0] },
      },
    }));
  }

  return (
    // main grid
    <Grid
      container
      sx={{
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      {/* text field for course input */}
      <Grid
        item
        xs={8}
        sx={{ mx: 1.5, bgcolor: 'background.default', borderRadius: 1 }}
      >
        <Autocomplete
          className="course-input"
          options={allCourses}
          autoHighlight
          autoComplete
          filterOptions={filterOptions}
          value={courseName}
          onChange={(_, value) => selectCourse(value)}
          renderInput={(params) => (
            <TextField
              color="textFieldColor"
              focused
              label={course}
              variant="filled"
              fullWidth
              {...params}
            />
          )}
          renderOption={(params, option) => (
            <li
              {...params}
              onMouseEnter={() => {
                setHovering(true)
                previewCourse(option)
              }}
              onMouseLeave={() => {
                deleteCourse()
                setHovering(false)
              }}
            >
              {option}
            </li>
          )}
        />
      </Grid>

      {/* button for deleting  course */}
      <Grid
        item
        xs={2}
        sx={{
          mx: 1.5,
          bgcolor: 'rgba(194,4,48)',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 100,
        }}
      >
        <IconButton
          className="course-delete"
          sx={{ color: 'white' }}
          onClick={handleClickOpen}
        >
          <DeleteIcon sx={{ height: '30px', width: '30px' }} />
        </IconButton>

        <Dialog
          open={open}
          onClose={handleCloseCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Delete ' + course}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {courseName} from the schedule?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancel} sx={{ color: 'grey' }}>
              Cancel
            </Button>
            <Button
              className="dialog-confirm"
              onClick={deleteCourse}
              autoFocus
              sx={{ color: 'red' }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      {courseName ? (
        <div className="secondary-info">
          <Typography variant="caption" align="center">
            Faculty: {courseData['Faculty']}, Meetings:{' '}
            {courseData['# of Meetings']}, Term: {courseData['Term']}
          </Typography>
        </div>
      ) : undefined}

      {collisionCourses.length ? (
        <div className="collide secondary-info">
          <WarningIcon
            sx={{
              height: '14px',
              width: '14px',
              display: 'inline',
              verticalAlign: 'middle',
            }}
          />
          <p style={{ fontSize: '14px', display: 'inline' }}>
            Conflicts with: {collisionCourses.join(', ')}
          </p>
        </div>
      ) : undefined}
    </Grid>
  );
}
