from cgitb import handler
from html.parser import HTMLParser
import csv
from enum import Enum
import json
import sys
import output
import time

class Column(Enum):
    TERM = 0
    STATUS = 1
    NAME = 2
    LOCATION = 3
    MEETINGS = 4
    FACULTY = 5
    CAPACITY = 6
    CREDITS = 7
    LEVEL = 8

outputColumns = [
    'Term',
    'Status',
    'Section Name and Title',
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
    'Lecture',
    'Lab',
    'Seminar',
    'DE',
    'Morning',
    'Afternoon',
    "# of Meetings"
]

sec = {
    "WSS_COURSE_SECTIONS" : Column.TERM,
    "LIST_VAR1" : Column.STATUS,
    "SEC_SHORT_TITLE" : Column.NAME,
    "SEC_LOCATION" : Column.LOCATION,
    "SEC_MEETING_INFO" : Column.MEETINGS,
    "SEC_FACULTY_INFO" : Column.FACULTY,
    "LIST_VAR5" : Column.CAPACITY,
    "SEC_MIN_CRED" : Column.CREDITS,
    "SEC_ACAD_LEVEL" : Column.LEVEL
}

def handleTerm(self, data):
    self.semester = data
    return

def handleStatus(self, data):
    return

def handleName(self, data):
    return

def handleLocation(self, data):
    return

def handleMeetings(self, data):
    return

def handleFaculty(self, data):
    return

def handleCapacity(self, data):
    return

def handleCredits(self, data):
    return

def handleLevel(self, data):
    return

handlers = {
    Column.TERM: handleTerm,
    Column.STATUS: handleStatus,
    Column.NAME: handleName,
    Column.LOCATION: handleLocation,
    Column.MEETINGS: handleMeetings,
    Column.FACULTY: handleFaculty,
    Column.CAPACITY: handleCapacity,
    Column.CREDITS: handleCredits,
    Column.LEVEL: handleLevel
}

class MyHTMLParser(HTMLParser):
    
    def __init__(self):
        super().__init__()
        self.courses = list()

        # Simple string properties
        self.semester = ""
        self.status = ""
        self.name = ""
        self.location = ""
        self.professor = ""
        self.capacity = ""
        self.credits = ""
        self.level = ""
        self.mon = "No"
        self.tues = "No"
        self.wed = "No"
        self.thur = "No"
        self.fri = "No"
        self.lec = "No"
        self.lab = "No"
        self.sem = "No"
        self.de = "No"
        self.morning = "No"
        self.afternoon = "No"
        # Set of meetings in the current course
        self.meetings = list()
        self.meeting = ""

        # Number of meetings in a current course
        self.numMeetings = 0
        # row_index used to tell which column we are in on the table
        self.row_index = -1
        # cell_index used to tell which row we are at in the cell (for meeting info)
        self.cell_index = -1

        self.handler = {
            Column.TERM: handleTerm,
            Column.STATUS: handleStatus,
            Column.NAME: handleName,
            Column.LOCATION: handleLocation,
            Column.MEETINGS: handleMeetings,
            Column.FACULTY: handleFaculty,
            Column.CAPACITY: handleCapacity,
            Column.CREDITS: handleCredits,
            Column.LEVEL: handleLevel
        }

    # Method to reset the current values after entering a new cell
    def clear(self):
        self.semester = ""
        self.status = ""
        self.name = ""
        self.location = ""
        self.meetings.clear()
        self.meeting = ""
        self.professor = ""
        self.capacity = ""
        self.credits = ""
        self.level = ""
        self.mon = "No"
        self.tues = "No"
        self.wed = "No"
        self.thur = "No"
        self.fri = "No"
        self.lec = "No"
        self.lab = "No"
        self.sem = "No"
        self.de = "No"
        self.numMeetings = 0
        self.morning = "No"
        self.afternoon = "No"
        self.row_index = -1
        self.cell_index = -1

    


    # Method to check what days have classes
    def check_meeting(self):
        # create a list of all possible meeting types that can have classes
        meetingTypes = ['LEC', 'LAB', 'SEM']
        # parse each meeting by lec,lab,sem, and exam
        for meeting in self.meetings:
            rows = meeting.split('\n')
            typeAndDays = rows[0]
            times = rows[1].split(' - ')

            if 'Distance Education' in meeting: self.de = 'Yes'
            for meetingType in meetingTypes:
                # check for all meeting types that can have classes
                if meetingType in typeAndDays:
                    if meetingType == 'LEC': self.lec = 'Yes'
                    elif meetingType == 'LAB': self.lab = 'Yes'
                    elif meetingType == 'SEM': self.sem = 'Yes'
                    # if found and lectures on weekdays and 'yes' to csv to indicate what days a class is available 
                    if 'Mon' in typeAndDays: 
                        self.mon = 'Yes' 
                        self.numMeetings += 1
                    if 'Tues' in typeAndDays: 
                        self.tues = 'Yes'
                        self.numMeetings += 1
                    if 'Wed' in typeAndDays: 
                        self.wed = 'Yes'
                        self.numMeetings += 1
                    if 'Thur' in typeAndDays: 
                        self.thur = 'Yes'
                        self.numMeetings += 1
                    if 'Fri' in typeAndDays: 
                        self.fri = 'Yes'
                        self.numMeetings += 1

                    try:
                        startTime = time.strptime(times[0], "%I:%M%p")
                        if startTime.tm_hour <= 11:
                            self.morning = 'Yes'

                        endTime = time.strptime(times[1], "%I:%M%p")
                        if endTime.tm_hour >= 3:
                            self.afternoon = 'Yes'
                    except:
                        None

                    break

    # Method to add a parsed course to the courses list
    def add_course(self):
        # If there is a meeting to add still we must add it to the list
        if (self.meeting != ""):
            self.meetings.append(self.meeting)
            self.check_meeting()    
            self.meeting = ""
        # If this is the last cell in the row then add this new course to the list
        self.courses.append([
            self.semester,
            self.status,
            self.name,
            self.location,
            list(self.meetings),
            self.professor,
            self.capacity,
            self.credits,
            self.level,
            self.mon,
            self.tues,
            self.wed,
            self.thur,
            self.fri,
            self.lec,
            self.lab,
            self.sem,
            self.de,
            self.morning,
            self.afternoon,
            self.numMeetings,
        ])
        self.clear()

    # Helper method that checks if an element has a class and optionally if it contains a given class
    # @param attrs list of attributes on element
    # @param expected_class string representing the class we are searching for
    # @return bool if the element has a class attribute and it contains the provided `expected_class`
    def has_class(self, attrs, expected_class = ""):
        return attrs and attrs[0] and attrs[0][0] == "class" and expected_class in attrs[0][1]

    # Method responsible for parsing the `Meeting Information` cell
    # @param attrs list of attributes on element
    def parse_meeting_div(self, attrs):
        if (self.has_class(attrs, "meet")):
            self.cell_index = 0

            # If we just parsed a meeting then add it to the list of meetings
            if (self.meeting != ""):
                self.meetings.append(self.meeting)
                self.meeting = ""
        # If we are now into another row of the meetings then add a newline
        elif (self.cell_index != -1):
            if (self.cell_index > 0):
                self.meeting += '\n'
            
            self.cell_index += 1

    # Method extended from `html.parser` to parse new HTML elements
    # @param tag HTML element that is being parsed
    # @param attrs list of attributes on element
    def handle_starttag(self, tag, attrs):
        if (self.row_index == Column.MEETINGS and tag == 'div'):
            self.parse_meeting_div(attrs)
            return

        if (tag != 'td'):
            return

        # This resets the cell_index once we are in a new <td>
        self.cell_index = -1

        if (not self.has_class(attrs)):
            return

        # This sets the index to the appropriate cell in the row based on the expected class of the <td> element
        
        row = attrs[0][1].split(" ")
        if (len(row) > 1 and row[1] in sec):
            self.row_index = sec.get(row[1])

    # Method extended from `html.parser` to parse text nodes
    # @param data the value of the text being parsed
    def handle_data(self, data):
        data = data.strip()
        if (self.row_index == -1 or data == ""):
            return


        if (self.row_index == Column.TERM):
            self.semester = data
        elif (self.row_index == Column.STATUS):
            self.status = data
        elif (self.row_index == Column.NAME):
            self.name = data
        elif (self.row_index == Column.LOCATION):
            self.location = data
        elif (self.row_index == Column.MEETINGS):
            self.meeting += data
        elif (self.row_index == Column.FACULTY):
            self.professor = data
        elif (self.row_index == Column.CAPACITY):
            self.capacity = data
        elif (self.row_index == Column.CREDITS):
            self.credits = data
        elif (self.row_index == Column.LEVEL):
            self.level = data
            self.add_course()

# Function takes in csv file opens it and converts to json file
# @param outfile string representing the filename to write to (excluding extension)
def convertCSVToJson(outfile):
    newlist = []
    with open(outfile+".csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            newlist.append(row)

    output.info(f"Creating JSON file: '{outfile + '.json'}'")
    with open(outfile+".json", 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(newlist, indent=4))
    jsonf.close()

# Function parses HTML file and saves the content to a csv file given by the user
# @param outfile string representing the filename to write to (excluding extension)
# @param input_file file that contains the HTML document to parse
def convertToCSV(outfile, input_file):
    parser = MyHTMLParser()

    output.info(f"Parsing HTML file: '{input_file.name}'")
    parser.feed(input_file.read())

    output.info(f"Creating CSV file: '{outfile + '.csv'}'")
    csv_file = open(outfile+".csv", 'w', encoding='UTF8', newline='')
    writer = csv.writer(csv_file)
    writer.writerow(outputColumns)
    for course in parser.courses:
        writer.writerow(course)
    csv_file.close()
    parser.close()

# Entry point to script
def main():
    if len(sys.argv) != 3:
        output.error("Incorrect usage: python parser.py <inputfile.html> <outputfile>")
        exit()
    
    input_file = open(sys.argv[1], 'r')
    outfile = sys.argv[2]
    convertToCSV(outfile,input_file)
    convertCSVToJson(outfile)

    output.success('\nAll done!')
    input_file.close()

if __name__ == "__main__":
    main()
