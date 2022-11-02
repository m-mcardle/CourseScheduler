import { useState } from 'react';
import { Box, Alert, AlertTitle, Collapse } from '@mui/material';

export default function CourseAlert({ message }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%', position: 'fixed' }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          onClose={() => {
            setOpen(!open);
          }}
          sx={{ mb: 2 }}
        >
          <AlertTitle>Warning</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
