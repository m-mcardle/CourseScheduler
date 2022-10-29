import { Typography, Grid } from '@mui/material';
import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function CourseDataPanel() {
  return (
    <Grid container spacing={0} sx={{ width: '65%' }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h3" component="h1">
          Data
        </Typography>
      </Grid>

      {Array.from({ length: 5 }, (_, i) => {
        return (
          <Grid
            key={i}
            item
            xs={12}
            sx={{ justifyContent: 'center', display: 'flex' }}
          >
            <TextareaAutosize
              minRows={3}
              aria-label="data textarea"
              placeholder="Empty"
              style={{ width: '80%' }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
