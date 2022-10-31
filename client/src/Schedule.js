import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2021-11-0';
const DayScaleLayout = props => ( <WeekView.DayScaleLayout {...props} style={{ display: 'none' }} />);

const week = {
    'Mon': 1,
    'Tues': 2,
    'Wed': 3,
    'Thur': 4,
    'Fri': 5
}

export default function Schedule({ courses }) {
    const [schedule, setSchedule] = useState([])
    useEffect(() => {
        const entries = []
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
                console.log(days);
    
                const time = rows[1].split(" - ")
                // const location = rows[2]
    
                for (const j in days) {
                    const start = time[0].includes("PM")
                        ? String(Number(time[0].replace("PM", "").split(":")[0]) + 12) + ":" + time[0].replace("PM", "").split(":")[1]
                        : time[0].replace("AM", "")
        
                    const end = time[1].includes("PM")
                        ? String(Number(time[1].replace("PM", "").split(":")[0]) + 12) + ":" + time[1].replace("PM", "").split(":")[1]
                        : time[1].replace("AM", "")
        
                    const newEntry = {
                        startDate: currentDate + week[days[j]] + 'T' + start,
                        endDate: currentDate + week[days[j]] + 'T' + end,
                        title: courseName
                    }
        
                    entries.push(newEntry)
                }
            }
        }

        setSchedule(entries)
    }, [courses])

    return (
        <Paper>
          <Scheduler
            data={schedule}
          >
            <ViewState
              currentDate={currentDate + '1'}
            />
            <WeekView
              startDayHour={8}
              endDayHour={20}
              excludedDays={[0, 6]}
              dayScaleLayoutComponent={DayScaleLayout}
            />
            <Appointments />
          </Scheduler>
        </Paper>
    );
};
