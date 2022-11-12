"""A dummy docstring."""
import json
from flask import Flask
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Open data file
file = open('./data/courses.json', encoding="utf8")
courses = json.load(file)
file.close()

# Valid Course fields
fields = [
    'Section Name and Title',
    'Term',
    'Status',
    'Location',
    'Meeting Information',
    'Faculty',
    'Available/Capacity',
    'Credits',
    'Academic Level',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'DE',
    'Seminar',
    'Lecture',
    'Lab',
    'Afternoon',
    'Morning',
    '# of Meetings'
]

# Endpoint provides all course data
@app.route("/api/courses")
def all_courses():
    """Function to get all courses in JSON."""
    return courses

# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/api/course/<field>/<value>")
def get_course(field = "Section Name and Title", value=None):
    """Function to get a course."""
    found_courses = []
    if field not in fields:
        return 'Invalid field'

    for course in courses:
        if value in course[field]:
            found_courses.append(course)

    return found_courses

def get_course_meeting(course_name):
    """Gets course meeting data for course."""
    index_found = -1
    for index, course in enumerate(courses):
        if course_name in course[fields[0]]:
            index_found = index
            break
    if index_found < 0:
        print("None")
        return 'Invalid'

    course = courses[index_found]

    course_meetings = {
        "LEC" : None,
        "LAB" : None,
        "SEM" : None,
        "EXAM" : None,
        "DE" : None,
    }
    meeting_info = {
        "TBA" : False,
        "Mon" : False,
        "Tues" : False,
        "Wed" : False,
        "Thur" : False,
        "Fri" : False,
        "StartTime" : "",
        "EndTime" : "",
        "Room" : "",
        "Date" : "" #if its an exam
    }
    # meeting_types = ['LEC', 'LAB', 'SEM']

    meetings = course[fields[4]].strip(' \'[]').split("', '")

    for meeting in meetings:
        type_day_time_room = meeting.split("\\n")

        # check what meeting type it is
        meeting_type = None
        if 'LEC' in type_day_time_room[0]:
            meeting_type = 'LEC'
        elif 'LAB' in type_day_time_room[0]:
            meeting_type = 'LAB'
        elif 'SEM' in type_day_time_room[0]:
            meeting_type = 'SEM'
        elif 'EXAM' in type_day_time_room[0]:
            meeting_type = 'EXAM'
        elif 'Distance Education' in type_day_time_room[0]:
            meeting_type = 'DE'
        else:
            print("None")
            return 'Invalid'

        course_meetings[meeting_type] = dict(meeting_info)
        # check what days it is on
        if "TBA" in type_day_time_room[0]:
            course_meetings[meeting_type]['TBA'] = True
        else:
            if 'Mon' in type_day_time_room[0]:
                course_meetings[meeting_type]['Mon'] = True
            if 'Tues' in type_day_time_room[0]:
                course_meetings[meeting_type]['Tues'] = True
            if 'Wed' in type_day_time_room[0]:
                course_meetings[meeting_type]['Wed'] = True
            if 'Thur' in type_day_time_room[0]:
                course_meetings[meeting_type]['Thur'] = True
            if 'Fri' in type_day_time_room[0]:
                course_meetings[meeting_type]['Fri'] = True

        # check the times
        if course_meetings[meeting_type]['TBA'] is False:
            times = type_day_time_room[1].split(' - ')
            course_meetings[meeting_type]['StartTime'] = times[0]
            if meeting_type == 'EXAM':
                times = times[1].split(' ')
                course_meetings[meeting_type]['EndTime'] = times[0]
                course_meetings[meeting_type]['Date'] = times[1]
            else:
                course_meetings[meeting_type]['EndTime'] = times[1]
        else:
            course_meetings[meeting_type]['StartTime'] = 'TBA'
            course_meetings[meeting_type]['StartTime'] = 'TBA'

        #check the the room
        course_meetings[meeting_type]['Room'] = type_day_time_room[2]

    return course_meetings

# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/api/course/<value>/meetings")
def get_course_meetings(value=None):
    """Route for getting course meetings."""
    return get_course_meeting(value)


if __name__ == '__main__':
    app.run(debug = True)
