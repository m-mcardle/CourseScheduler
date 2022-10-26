from flask import Flask
import json

# Initialize Flask app
app = Flask(__name__)

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
@app.route("/courses")
def all_courses():
    return courses

# Endpoint returns all courses that contain a "value" for a given "field"
@app.route("/course/<field>/<value>")
def get_course(field = "Section Name and Title", value=None):
    found_courses = []
    if field not in fields:
        return 'Invalid field'

    for course in courses:
        if value in course[field]:
            found_courses.append(course)
    
    return found_courses


if __name__ == '__main__':
    app.run(debug = True)
