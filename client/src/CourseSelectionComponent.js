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
import React, { useState, useEffect,} from 'react';

const filterOptions = createFilterOptions({
  limit: 8,
});

export default function CourseSelectionComponent({ course, setCourses, allCourses, collisionCourses, semester}) {
  // setting states
  const [{courseName}, setCourse] = useState({ courseName: null});
  const [{courseData}, setCourseData] = useState({ courseData: [] });
  
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    async function clearCourses() {
      setCourse({ courseName: null})
      setCourseData({ courseData: []})
    }

    clearCourses();
  }, [semester]);



  const handleClickOpen = () => {
    if (courseName !== null) {
      setOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    setOpen(false);
    
    // Remove course from `courses`
    setCourses((state) => {
      delete state.courses[course];
      return  { ...state, courses:  { ...state.courses } };
    })

    // Clear input values
    setCourse({ courseName: null})
    setCourseData({ courseData: []})
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  // function to get course data from api
  async function getCourseData(){
    if (!courseName) { return; }
  
    const response = await fetch('https://20.168.192.248/api/course/Section%20Name%20and%20Title/'+courseName+'?'+semester);
    const data = await response.json();
    
    setCourse((state) => ({ ...state, courseData: data }));

    if (data.length === 1) {
      setCourses((state) => ({...state, courses: { ...state.courses, [course]: data[0] } }))
    }
  }

  async function getExtraData(value){
    setCourse((state) => ({ ...state, courseName: value }))
    const response = await fetch('https://20.168.192.248/api/course/Section%20Name%20and%20Title/'+value+'?'+semester);
    const data = await response.json();
    setCourseData((state) => ({ ...state, courseData: data[0]}));
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
          onChange={(_, value) => getExtraData(value)}
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
          onClick={() => getCourseData()}
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
