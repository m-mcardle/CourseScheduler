import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  WeekView,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const currentMonth = '2021-11';
const week = {
  'Mon': 1,
  'Tues': 2,
  'Wed': 3,
  'Thur': 4,
  'Fri': 5
}

export default function Schedule({ courses, setCourses }) {
  const [state, setState] = useState({
    appointments: [],
    resources: [
      {
        fieldName: 'course',
        title: 'Course',
        instances: []
      }
    ]
  });

  useEffect(() => {
    const entries = []
    const instances = []

    let courseNum = 0;
    for (const [, value] of Object.entries(courses)) {
      const courseName = value['Section Name and Title']
      let rawMeetings = value['Meeting Information']
      rawMeetings = rawMeetings.replace(/'/g, '"')

      const meetings = JSON.parse(rawMeetings)

      for (const i in meetings) {
        const rows = meetings[i].split('\n')

        const type = rows[0].split(' ', 1)[0]
        if (type !== 'LEC' && type !== 'LAB' && type !== 'SEM') {
          continue;
        }

        const days = rows[0].replace(type, "").replace(/ /g, "").split(",");

        const time = rows[1].split(" - ")
        const location = rows[2]

        for (const j in days) {
          const start = time[0].includes("PM") && !time[1].includes("12:")
            ? String(Number(time[0].replace("PM", "").split(":")[0]) + 12) + ":" + time[0].replace("PM", "").split(":")[1]
            : time[0].replace("AM", "").replace("PM", "")

          const end = time[1].includes("PM") && !time[1].includes("12:")
            ? String(Number(time[1].replace("PM", "").split(":")[0]) + 12) + ":" + time[1].replace("PM", "").split(":")[1]
            : time[1].replace("AM", "").replace("PM", "")

          const newEntry = {
            startDate: currentMonth + '-0' + week[days[j]] + 'T' + start,
            endDate: currentMonth + '-0' + week[days[j]] + 'T' + end,
            title: courseName,
            location,
            id: courseName + courseNum + i + week[days[j]],
            course: courseName
          }

          entries.push(newEntry)
        }
      }

      instances.push(
        {
          id: courseName
        }
      )
    }

    setState(state => ({
      ...state,
      appointments: entries,
      resources: [
        {
          fieldName: 'course',
          title: 'Course',
          instances
        }
      ]
    }))
  }, [courses])

  // Hook for detecting collisions
  useEffect(() => {
    const collisions = [];
    const dates = [];
    for (const i in state.appointments) {
      const appointment = state.appointments[i]
      const start = dayjs(appointment.startDate);
      const end = dayjs(appointment.endDate);

      for (const j in dates) {
        // Shift times by a second to ensure that matching start/end times count as collisions
        const newStart = start.add(1, 'second');
        const newEnd = end.subtract(1, 'second');
        if (newStart.isBetween(dates[j].start, dates[j].end) || newEnd.isBetween(dates[j].start, dates[j].end)) {
          collisions.push({
            course1: appointment.course,
            course2: state.appointments[j].course,
          })
        }
      }

      dates[i] = {
        start,
        end
      };
    }
    setCourses(state => ({ ...state, collisions }));
  }, [state.appointments, setCourses])

  return (
    <Paper style={{ maxWidth: '55%', height: '800px', margin: 'auto' }}>
      <Scheduler
        data={state.appointments}
      >
        <ViewState
          currentDate={currentMonth + '-01'}
        />
        <WeekView
          startDayHour={8}
          endDayHour={22}
          excludedDays={[0, 6]}
        />
        <Appointments />
        <Resources
          data={state.resources}
          mainResourceName={'course'}
        />
      </Scheduler>
    </Paper>
  );
};
