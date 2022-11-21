import { useState } from 'react';
import * as React from 'react';
import { 
  Box, 
  Button, 
  Modal, 
  Grid,   
  ToggleButton,
  ToggleButtonGroup,
  Switch
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function FilterModal(setDays, days, setTimes, times, setClasses, classes, setSemester, semester) {
// export function FilterModal() {

  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDays = (
    event,
    newDays,
  ) => {
    if (newDays.length) {
      setDays(newDays)

    }
  };
 
  const handleTimes = (
    event,
    newTimes,
  ) => {
    if (newTimes.length) {
      setTimes(newTimes);
    }
  };
 
  const handleClasses = (
    event,
    newClasses,
  ) => {
    if (newClasses.length) {
      setClasses(newClasses);
    }
  };

  const handleSemester = () => {
    if (semester == 'f22') {
      setSemester('w23');
    } else {
      setSemester('f22');
    }
  };

  return (
    <div>
      <Button
        onClick={handleModalOpen}
        sx={{
          mt: 0.5,
          bgcolor: 'rgba(255,204,0)',
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
        <Box sx={style}>
          
          Exculde Days
          <Grid item xs={12} sx={{ height: "8vh", p: 1, textAlign: 'center' }}>
            
            <ToggleButtonGroup
            value = {days}
            onChange={handleDays}
            aria-label="device"
            >
              
              <ToggleButton value="Monday" aria-label="Monday">
                Monday
              </ToggleButton>

              <ToggleButton value="Tuesday" aria-label="Tuesday">
                Tuesday
              </ToggleButton>

              <ToggleButton value="Wednesday" aria-label="Wednesday">
                Wednesday
              </ToggleButton>                

              <ToggleButton value="Thursday" aria-label="Thursday">
                Thursday
              </ToggleButton>

              <ToggleButton value="Friday" aria-label="Friday">
                Friday
              </ToggleButton>

            </ToggleButtonGroup>
          </Grid>
          
          Exclude Times
          <Grid item xs={12} sx={{ height: "8vh", p: 1, textAlign: 'center' }}>
            <ToggleButtonGroup
              value= {times}
              onChange={handleTimes}
              aria-label="device"
            >  
              
              <ToggleButton className='Togglebutton' value="Morning" aria-label="Morning">
                Morning
              </ToggleButton>

              <ToggleButton value="Afternoon" aria-label="Afternoon">
                Afternoon
              </ToggleButton>
            
            </ToggleButtonGroup>
          </Grid>
          
          Exclude Class Type
          <Grid item xs={12} sx={{ height: "8vh", p: 1, textAlign: 'center' }}>
            <ToggleButtonGroup
              value= {classes}
              onChange={handleClasses}
              aria-label="device"
            >    
              <ToggleButton value="Lecture" aria-label="Lecture">
                Lecture
              </ToggleButton>

              <ToggleButton value="Lab" aria-label="Lab">
                Lab
              </ToggleButton>

              <ToggleButton value="Seminar" aria-label="Seminar">
                Seminar
              </ToggleButton>
            
            </ToggleButtonGroup>
          </Grid>

          Choose Semester
          <Grid item xs={12} sx={{ height: "8vh", p: 1, textAlign: 'center' }}>

            F22
            <Switch color = 'error' onChange={handleSemester} />
            W23
          </Grid>



        </Box>
      </Modal>
    </div>
  );
}
