# cli.py 
# This is the Python script for the CLI to search for courses
# This CLI requires a CSV or JSON file generated from parser.py
# Usage: python cli.py -f <filename>

#Imports
import json
import csv
import sys
import getopt
import output
import os.path

# global
fields=[
    'Section Name and Title', 
    'Term', 
    'Status', 
    'Location', 
    'Meeting Information', 
    'Faculty', 
    'Available/Capacity', 
    'Credits', 
    'Academic Level'
]

# function to print intro
def printIntro():
    output.info(
        "-----------------------------------\n" +
        " Welcome to the course search CLI.\n" +
        " Follow prompts to search.\n" +
        "-----------------------------------\n"
    )

# function to print help
def printHelp():
    print("Available Fields: ")
    for i,field in enumerate(fields):
        print(field, " = ", i+1)
    print("\nEnter -q for quit and -h for help.\n\n"),

# function to check for 
# @param option string '-h' for help '-q' for quit
# @return bool value to continue cli loop
def checkInput(option):
    if option == "-q": sys.exit(2)
    if option == "-h": 
        printHelp()
        return True
    return False

# function to print course object
# @param course dict with course info
def printCourse(course):
    print(
        "Course '" + course['Section Name and Title'] + "' was found:\n" + 
        "Term: " + course['Term'] + "\n" +
        "Status: " + course['Status'] + "\n" +
        "Location: " + course['Location'] + "\n" +
        "Meeting Information: " + course['Meeting Information'] + "\n" +
        "Faculty: " + course['Faculty'] + "\n" +
        "Available/Capacity: " + course['Available/Capacity'] + "\n" +
        "Credits: " + course['Credits'] + "\n" +
        "Academic Level: " + course['Academic Level'] + "\n"
    )

# function to create a list of course objects from a CSV or JSON file
# @param filename string of the filename
# @param ftype string of the file ending CSV or JSON
# @return list of course objects
def createCourses(filename, ftype):
    courses = []
    
    if ftype == 'csv':
        csv_file = open(filename, 'r', encoding='UTF8')
        # This acts like a regular reader but maps each row to a dictionary that can be accessed by the key/column name
        reader = csv.DictReader(csv_file)
        for row in reader:
            courses.append(row)
        csv_file.close()

    elif ftype == 'json':
        # load JSON file
        f = open(filename)
        courses = json.load(f)
        f.close()

    return courses

# function to find file type
# @param filename string of the filename
# @return string of file type
def getFileType(filename):
    fileType = filename.split('.')[-1]
    # must be csv or json
    if fileType not in ('json', 'csv'):
        output.error(f"Incompatible file extension '.{fileType}', use .json or .csv")
        sys.exit(2)
    return fileType

# function to handle invalid usage error
def invalidUsageError():
    output.error(
        'Invalid usage:\n' +
        '    cli.py -f <filename>'
    )
    sys.exit(2)

# function to find file name and type
# @param argv list command line args
# @return string of file type
# @return string of file type
def getFile(argv):
    # Gets arguments from command line
    inputFile, fileType = "",""

    try:
        (opts, _) = getopt.getopt(argv, "f:", ["file="])
    except getopt.GetoptError:
        invalidUsageError()

    # more error handling for arguments
    if opts:
        if len(opts) > 1 or opts[0][0] not in ('-f', '--file'): invalidUsageError()
        for opt,arg in opts:
            if os.path.exists(arg):
                inputFile = arg
            else:
                output.error(
                    'Invalid input file:\n' +
                    '    File does not exist'
                )
                sys.exit(2)
            fileType = getFileType(arg)
    else:
        invalidUsageError()

    return inputFile, fileType

# main function for CLI, parses input file and handles CLI loop with user input
def main(argv):

    # load data
    inputFile, fileType = getFile(argv)
    courses = createCourses(inputFile, fileType)

    printIntro()
    printHelp()

    # CLI loop
    while (True):
        result = []

        # get option for field to search for
        optionInt = 0
        try:
            inputOption = output.get_input("What field do want to search for (1-9): ")
            if checkInput(inputOption):
                continue
            optionInt = int(inputOption)
        except ValueError:
            output.warn('Please only input digits\n')
            continue

        if 1 > optionInt or optionInt > 9:
            output.warn('Please only input digits between 1 and 9\n')
            continue
        option = fields[optionInt-1]
        

        # get search value
        search = output.get_input(f"({option}) Enter your search: ")
        output.info('\n------------------------------------------------\n')
        if checkInput(search):
            continue

        # filter through loaded data
        for course in courses:
            if search in course[option]:
                result.append(course)

        # print result
        if result:
            for i,course in enumerate(result):
                print(f"{i+1}, ")
                printCourse(course)
        else:
            output.warn("No results found\n")


if __name__ == "__main__":
    main(sys.argv[1:])
