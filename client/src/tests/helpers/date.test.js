import { parseCourses } from '../../helpers/date';

describe('Valid meetings', () => {
  // Course has a seminar and lecture meeting
  const courses = {
    'Course 1': {
      'Section Name and Title': 'Valid*1000 course',
      'Meeting Information': "['LEC Fri\\n08:30AM - 10:20AM\\nROZH, Room 104', 'SEM Tues\\n08:30AM - 09:20AM\\nMCKN, Room 227']"
    }
  }

  test('returns expected entries and instances', () => {
    const expectedEntries = [
      {
        startDate: '2021-11-05T08:30',
        endDate: '2021-11-05T10:20',
        title: 'Valid*1000 (LEC)',
        location: 'ROZH, Room 104',
        id: 'Course 1Valid*1000 course0005',
        course: 'Valid*1000 course'
      },
      {
        startDate: '2021-11-02T08:30',
        endDate: '2021-11-02T09:20',
        title: 'Valid*1000 (SEM)',
        location: 'MCKN, Room 227',
        id: 'Course 1Valid*1000 course0102',
        course: 'Valid*1000 course'
      }
    ];

    const expectedInstances = [
      {
        id: 'Valid*1000 course',
        text: 'Valid*1000 course'
      }
    ];

    const { entries, instances } = parseCourses(courses);
    expect(entries).toEqual(expectedEntries);
    expect(instances).toEqual(expectedInstances);
  });
})

describe('Invalid meetings', () => {
  // Course only has a TBA meeting with an EXAM which should be excluded
  const courses = {
    'Course 1': {
      'Section Name and Title': 'Invalid*1000 course',
      'Meeting Information': "['LAB Days TBA\\nTimes TBA\\nAD-A, Room REMOTE', 'EXAM Wed\\n02:30PM - 04:30PM (2022/12/14)\\nRoom TBA']"
    }
  }

  test('returns empty entries and expected instances', () => {
    const expectedEntries = [];

    const expectedInstances = [
      {
        id: 'Invalid*1000 course',
        text: 'Invalid*1000 course'
      }
    ];

    const { entries, instances } = parseCourses(courses);
    expect(entries).toEqual(expectedEntries);
    expect(instances).toEqual(expectedInstances);
  });
})
