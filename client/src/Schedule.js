import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  WeekView,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Typography } from '@mui/material';

import { currentDate, parseCourses } from './helpers/date';

dayjs.extend(isBetween);

export default function Schedule({ courses, setCourses }) {
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
    const { entries, instances } = parseCourses(courses);

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
  }, [courses]);

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
    <div className="schedule" style={{ maxWidth: '70%', height: '100vh' }}>
      <Typography color="grey" align="center" fontSize="4vh" fontWeight="bold">
        Course Schedule
      </Typography>
      <Paper style={{ height: '92vh', width: '100%' }}>
        <Scheduler data={state.appointments}>
          <ViewState currentDate={currentDate} />
          <WeekView startDayHour={8} endDayHour={22} excludedDays={[0, 6]} />
          <Appointments />
          <AppointmentTooltip showCloseButton />
          <Resources data={state.resources} mainResourceName={'course'} />
        </Scheduler>
      </Paper>
    </div>
  );
}
