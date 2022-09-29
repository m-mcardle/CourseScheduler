import unittest
import os
from parser import Column, MyHTMLParser, convertToCSV, convertCSVToJson
import json

## usage python -m unittest .\tests\parser_test.py

class TestParser(unittest.TestCase):

    html_parser = MyHTMLParser()
    test_file = open('./tests/data/test.html')
    html_parser.feed(test_file.read())

    def test_courses(self):
        self.assertEqual(len(self.html_parser.courses), 1)

    def test_course_semester(self):
        self.assertEqual(self.html_parser.courses[0][Column.TERM.value], 'Fall 2022')

    def test_course_name(self):
        self.assertEqual(self.html_parser.courses[0][Column.NAME.value], 'ACCT*1220*0101 (6573) Intro Financial Accounting')
    
    def test_course_status(self):
        self.assertEqual(self.html_parser.courses[0][Column.STATUS.value], 'Open')

    def test_course_location(self):
        self.assertEqual(self.html_parser.courses[0][Column.LOCATION.value], 'Guelph')

    def test_course_meetings(self):
        self.assertEqual(len(self.html_parser.courses[0][Column.MEETINGS.value]), 3)
        self.assertEqual(self.html_parser.courses[0][Column.MEETINGS.value][0], 'LEC Fri\n08:30AM - 10:20AM\nROZH, Room 104')

    def test_course_professor(self):
        self.assertEqual(self.html_parser.courses[0][Column.FACULTY.value], 'P. Lassou')

    def test_course_capacity(self):
        self.assertEqual(self.html_parser.courses[0][Column.CAPACITY.value], '3 / 48')

    def test_course_credits(self):
        self.assertEqual(self.html_parser.courses[0][Column.CREDITS.value], '0.50')

    def test_course_level(self):
        self.assertEqual(self.html_parser.courses[0][Column.LEVEL.value], 'Undergraduate')
    
    def test_courses_to_csv(self):
        # Reset to start of file
        self.test_file.seek(0)
        outfile = 'test_output'

        convertToCSV(outfile, self.test_file)
        csv_file = open(outfile + '.csv')

        expected_csv = open('./tests/data/expected.csv')
        try:
            self.assertEqual(csv_file.read(), expected_csv.read())
        finally:
            csv_file.close()
            expected_csv.close()
            os.remove(outfile + '.csv')

    def test_csv_to_json(self):
        # Reset to start of file
        self.test_file.seek(0)
        outfile = 'test_output'

        convertToCSV(outfile, self.test_file)
        csv_file = open(outfile + '.csv')

        convertCSVToJson(outfile)
        json_file = open(outfile + '.json')

        expected_json = open('./tests/data/expected.json')
        try:
            self.assertEqual(json_file.read(), expected_json.read())
        finally:
            csv_file.close()
            json_file.close()
            expected_json.close()
            os.remove(outfile + '.csv')
            os.remove(outfile + '.json')



if __name__ == '__main__':
    unittest.main()
