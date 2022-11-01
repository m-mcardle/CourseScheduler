from flask import Flask
from flask_cors import CORS
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Open data file
file = open('./data/courses.json')
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
    return courses

# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/api/course/<field>/<value>")
def get_course(field = "Section Name and Title", value=None):
    found_courses = []
    if field not in fields:
        return 'Invalid field'

    for course in courses:
        if value in course[field]:
            found_courses.append(course)
    
    return found_courses

def getCourseMeeting(courseName):
    indexFound = -1
    for index, course in enumerate(courses):
        if courseName in course[fields[0]]:
            indexFound = index
            break
    
    if (indexFound < 0):
        print("None")
        return 'Invalid'

    course = courses[indexFound]

    courseMeetings = {
        "LEC" : None,
        "LAB" : None,
        "SEM" : None,
        "EXAM" : None,
        "DE" : None,
    }
    meetingInfo = {
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
    meetingTypes = ['LEC', 'LAB', 'SEM']

    meetings = course[fields[4]].strip(' \'[]').split("', '")

    for meeting in meetings:
        #print(meeting)
        typeDayTimeRoom = meeting.split("\\n")

        # check what meeting type it is
        meetingType = None
        if 'LEC' in typeDayTimeRoom[0]: meetingType = 'LEC'
        elif 'LAB' in typeDayTimeRoom[0]: meetingType = 'LAB'
        elif 'SEM' in typeDayTimeRoom[0]: meetingType = 'SEM'
        elif 'EXAM' in typeDayTimeRoom[0]: meetingType = 'EXAM'
        elif 'Distance Education' in typeDayTimeRoom[0]: meetingType = 'DE'
        else: 
            print("None")
            return 'Invalid'

        courseMeetings[meetingType] = dict(meetingInfo)
        
        # check what days it is on
        if "TBA" in typeDayTimeRoom[0]: courseMeetings[meetingType]['TBA'] = True
        else:
            if 'Mon' in typeDayTimeRoom[0]: courseMeetings[meetingType]['Mon'] = True
            if 'Tues' in typeDayTimeRoom[0]: courseMeetings[meetingType]['Tues'] = True
            if 'Wed' in typeDayTimeRoom[0]: courseMeetings[meetingType]['Wed'] = True
            if 'Thur' in typeDayTimeRoom[0]: courseMeetings[meetingType]['Thur'] = True
            if 'Fri' in typeDayTimeRoom[0]: courseMeetings[meetingType]['Fri'] = True

        # check the times
        if courseMeetings[meetingType]['TBA'] == False:
            times = typeDayTimeRoom[1].split(' - ')
            courseMeetings[meetingType]['StartTime'] = times[0]
            if meetingType == 'EXAM':
                times = times[1].split(' ')
                courseMeetings[meetingType]['EndTime'] = times[0]
                courseMeetings[meetingType]['Date'] = times[1]
            else:
                courseMeetings[meetingType]['EndTime'] = times[1]
        else:
            courseMeetings[meetingType]['StartTime'] = 'TBA'
            courseMeetings[meetingType]['StartTime'] = 'TBA'

        #check the the room
        courseMeetings[meetingType]['Room'] = typeDayTimeRoom[2]

    return courseMeetings

# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/api/course/<value>/meetings")
def get_courseMeetings(value=None):
    return getCourseMeeting(value)


if __name__ == '__main__':
    app.run(debug = True)
