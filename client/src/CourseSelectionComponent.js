import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
  DialogTitle
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse, removeCourse } from './slice';

const filterOptions = createFilterOptions({
  limit: 8,
});

export default function CourseSelectionComponent({ course, setCourses, allCourses, collisionCourses, semester, selectedCourses }) {
  // setting states
  const [courseName, setCourse] = useState(selectedCourses[course] ? selectedCourses[course]['Section Name and Title'] : null);
  const [courseData, setCourseData] = useState(selectedCourses[course] ? selectedCourses[course] : {});
  
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  // Reset course each time semester changes
  useEffect(() => {
    setCourse(selectedCourses[course] ? selectedCourses[course]['Section Name and Title'] : null)
    setCourseData(selectedCourses[course] ? selectedCourses[course] : {})
  }, [semester])

  const handleClickOpen = () => {
    if (courseName !== null) {
      setOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    dispatch(removeCourse({ i: course }))
    setOpen(false);
    
    // Remove course from `courses`
    setCourses((state) => {
      delete state.courses[course];
      return  { ...state, courses:  { ...state.courses } };
    })

    // Clear input values
    setCourse(null)
    setCourseData({})
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  // function to get course data from api
  async function getCourseData(courseToFetch=courseName) {
    if (!courseToFetch) { return; }
  
    const response = await fetch(`https://20.168.192.248/api/course/Section%20Name%20and%20Title/${courseToFetch}?${semester}`);
    const data = await response.json();
    return data;
  }

  async function submitCourse() {
    if (courseData['Section Name and Title']) {
      dispatch(addCourse({ course: courseData, i: course }))
      setCourses((state) => ({
          ...state,
          courses: {
              ...state.courses,
              [course]: courseData
          }
        })
      )
    }
  }

  async function selectCourse(newValue) {
    setCourse(newValue);
    const data = await getCourseData(newValue);

    if (!data) {
      setCourseData({});
    } else {
      setCourseData(data[0]);
    }
  }

  return (
    // main grid
    <Grid container  sx={{ p: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      {/* text field for course input */}
      <Grid item xs={8} sx={{ mx: 1.5, bgcolor: 'rgba(255,255,255)', borderRadius:1}}>
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
              color = "main"
              focused
              label={course} 
              variant="filled"
              fullWidth
              {...params}
            />
          )}
        />
      </Grid>
      
      {/* button for adding course */}
      <Grid
        item
        xs={1}
        sx={{
          mx: 1.5,
          bgcolor: 'rgba(255,204,0)',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 100
        }}
      >
        <IconButton
          className="course-submit"
          aria-label="add"
          onClick={() => submitCourse()}
          sx={{  color: 'white' }}
        >
          <AddIcon sx={{  height: "30px", width: "30px"}} />
        </IconButton>
      </Grid>

      {/* button for deleting  course */}
      <Grid
        item
        xs={1}
        sx={{
          mx: 1.5,
          bgcolor: 'rgba(194,4,48)',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: 100
        }}
      >
        <IconButton
          className="course-delete"
          sx={{  color: 'white' }}
          onClick={handleClickOpen}
        >
          <DeleteIcon sx={{  height: "30px", width: "30px"}} />
        </IconButton>

        <Dialog
          open={open}
          onClose={handleCloseCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" >
            {"Delete " + course}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {courseName} from the schedule?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancel} sx={{color:'grey'}}>Cancel</Button>
            <Button className="dialog-confirm" onClick={handleCloseConfirm} autoFocus sx={{color:'red'}}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </Grid>

      {courseName
        ?
        <div className='secondary-info'>
          <p className='secondary-text'>Faculty: {courseData['Faculty']}, Meetings: {courseData['# of Meetings']}, Term: {courseData['Term']}</p>
        </div>
        : undefined
      }

      {collisionCourses.length
        ?
        <div className='collide secondary-info'>
          <WarningIcon sx={{  height: "14px", width: "14px", display: 'inline', verticalAlign: 'middle' }} />
          <p style={{ fontSize: '14px', display: 'inline' }}>Conflicts with: {collisionCourses.join(', ')}</p>
        </div>
        : undefined
      }
    </Grid>
  );
}
