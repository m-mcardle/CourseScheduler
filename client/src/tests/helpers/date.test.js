import { parseCourses } from '../../helpers/date';

describe('Valid meetings', () => {
  // Course has a seminar and lecture meeting
  const courses = {
    'Course 1': {
      'Section Name and Title': 'Valid course',
      'Meeting Information': "['LEC Fri\\n08:30AM - 10:20AM\\nROZH, Room 104', 'SEM Tues\\n08:30AM - 09:20AM\\nMCKN, Room 227']"
    }
  }

  test('returns expected entries and instances', () => {
    const expectedEntries = [
      {
        startDate: '2021-11-05T08:30',
        endDate: '2021-11-05T10:20',
        title: 'Valid course',
        location: 'ROZH, Room 104',
        id: 'Valid course0005',
        course: 'Valid course'
      },
      {
        startDate: '2021-11-02T08:30',
        endDate: '2021-11-02T09:20',
        title: 'Valid course',
        location: 'MCKN, Room 227',
        id: 'Valid course0102',
        course: 'Valid course'
      }
    ];

    const expectedInstances = [
      {
        id: 'Valid course'
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
      'Section Name and Title': 'Invalid course',
      'Meeting Information': "['LAB Days TBA\\nTimes TBA\\nAD-A, Room REMOTE', 'EXAM Wed\\n02:30PM - 04:30PM (2022/12/14)\\nRoom TBA']"
    }
  }

  test('returns empty entries and expected instances', () => {
    const expectedEntries = [];

    const expectedInstances = [
      {
        id: 'Invalid course'
      }
    ];

    const { entries, instances } = parseCourses(courses);
    expect(entries).toEqual(expectedEntries);
    expect(instances).toEqual(expectedInstances);
  });
})
