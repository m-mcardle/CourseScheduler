"""A dummy docstring."""
import json
from flask import Flask, request
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Open data files
f22_file = open('./data/f22.json', encoding="utf8")
f22 = json.load(f22_file)
f22_file.close()

w23_file = open('./data/w23.json', encoding="utf8")
w23 = json.load(w23_file)
w23_file.close()

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

# Filter options for GET requests
options = [
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
@app.route("/api/f22")
def f22_route():
    """Function to get all courses for F22 in JSON."""
    args = request.args
    courses = []
    for course in f22:
        valid = True
        for option in options:
            if option in args:
                if args[option] != course[option]:
                    valid = False
                    break
        if valid:
            courses.append(course)

    return courses

@app.route("/api/w23")
def w23_route():
    """Function to get all courses for W23 in JSON."""
    args = request.args
    courses = []
    for course in w23:
        valid = True
        for option in options:
            if option in args:
                if args[option] != course[option]:
                    valid = False
                    break
        if valid:
            courses.append(course)

    return courses


# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/api/course/<field>/<value>")
def get_course(field = "Section Name and Title", value=None):
    """Function to get a course."""
    args = request.args
    course_data = w23 if 'w23' in args.keys() else f22
    found_courses = []
    if field not in fields:
        return 'Invalid field'

    for course in course_data:
        if value in course[field]:
            found_courses.append(course)

    return found_courses

def get_course_meeting(course_name):
    """Gets course meeting data for course."""
    index_found = -1
    for index, course in enumerate(f22):
        if course_name in course[fields[0]]:
            index_found = index
            break
    if index_found < 0:
        print("None")
        return 'Invalid'

    course = f22[index_found]

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
