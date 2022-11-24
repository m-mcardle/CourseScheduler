export const currentMonth = '2021-11';
export const currentDate = '2021-11-01';

// Used to find the day number for a given day string
const dayOfWeek = {
  'Mon': '01',
  'Tues': '02',
  'Wed': '03',
  'Thur': '04',
  'Fri': '05'
}

// Takes in object of courses with properties as `Course 1: CIS*3760`, `Course 2: CIS*3210`
// Returns object containing entries (meetings) and instances (courses)
export function parseCourses(courses, parseExams="false") {
    const entries = []
    const instances = []

    // Value of `parseExams` will be string of boolean, this just simplifies it to a boolean
    parseExams = (parseExams === "true");

    let courseNum = 0;
    for (const [key, value] of Object.entries(courses)) {
      const courseName = value['Section Name and Title']
      const courseCode = courseName.split(' ', 1)[0]
      let rawMeetings = value['Meeting Information']
      rawMeetings = rawMeetings.replace(/'/g, '"')

      const meetings = JSON.parse(rawMeetings)

      for (const i in meetings) {
        const rows = meetings[i].split('\n');

        const type = rows[0].split(' ', 1)[0]
        // If meeting isn't a valid type skip
        if (type !== 'LEC' && type !== 'LAB' && type !== 'SEM' && type !== 'EXAM') {
          continue;
        }

        // If meeting is an exam but we aren't showing exams skip
        if (!parseExams && type === 'EXAM') {
          continue;
        }

        const days = rows[0].replace(type, "").replace(/ /g, "").split(",");
        // If day is TBA skip
        if (days.includes('TBA')) {
          continue;
        }

        // This splits the time into start/end and then removes any dates (ex: `02:30PM - 04:30PM (2022/12/09)` ==> removes `(2022/12/09)`)
        const times = rows[1].split(" - ").map((time) => time.split(' ')[0]);
        const location = rows[2];

        for (const j in days) {
          // If time is TBA skip
          if (times[0].includes('TBA') || times[1].includes('TBA')) {
            continue;
          }

          const startTime = times[0].includes("PM") && !times[1].includes("12:")
            ? String(Number(times[0].replace("PM", "").split(":")[0]) + 12) + ":" + times[0].replace("PM", "").split(":")[1]
            : times[0].replace("AM", "").replace("PM", "")

          const endTime = times[1].includes("PM") && !times[1].includes("12:")
            ? String(Number(times[1].replace("PM", "").split(":")[0]) + 12) + ":" + times[1].replace("PM", "").split(":")[1]
            : times[1].replace("AM", "").replace("PM", "")

          const newEntry = {
            startDate: currentMonth + '-' + dayOfWeek[days[j]] + 'T' + startTime,
            endDate: currentMonth + '-' + dayOfWeek[days[j]] + 'T' + endTime,
            title: courseCode + ` (${type})`,
            location,
            id: key + courseName + courseNum + i + dayOfWeek[days[j]],
            course: courseName
          }
          classFind(location).then((data) => newEntry.classFind = data);
          entries.push(newEntry)
        }
      }

      instances.push(
        {
          id: courseName,
          text: courseName
        }
      )
    }

    return {
        instances,
        entries
    }
}

export async function classFind(location) {
  const formattedLocation = location.replace(", Room ", "");

  const response = await fetch(`http://127.0.0.1:5000/api/classfind?location=${formattedLocation}`);
  const data =  await response.json();
  return (data === 200) ? formattedLocation : '';
}
