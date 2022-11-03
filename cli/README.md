# /cli

This repository contains the code required for **Sprint 1**. This sprint involves parsing a HTML file containing the course list for the University of Guelph, storing the relevant data into a CSV or JSON file, and then providing a CLI to search for courses using this data. View the full guidelines [here](https://gitlab.socs.uoguelph.ca/groups/cis3760_team205/-/wikis/Sprint-One---Description).

---
<br/>

## Parser

Our parser was built through implementing the `html.parser` library to extract the relevant information out of the HTML document. Once parsed it will output the data into a CSV and JSON file with a name provided through a command line argument.

Full design documentation is available [here](https://gitlab.socs.uoguelph.ca/cis3760_team205/sprint-1/-/wikis/HTML-Parser-Design-Document).

Usage:
```
python parser.py <path_to_html> <output_file>
```

Example:
```
python parser.py 'filename.html' output
```

### Tests

The Parser has a test suite built using the `unittest` library.

To run all the test for Parser:
```
python -m unittest .\tests\parser_test.py
```

---
<br/>


## CLI

Our CLI was built based on the json and csv files from the HTML Parser (Step 2). Once the json and csv files are generated from Step 2 the user has the choice to search for courses either from the json file or from the csv file.

Full design documentation is available [here](https://gitlab.socs.uoguelph.ca/cis3760_team205/sprint-1/-/wikis/CLI-Design-Document).

Usage:
```
python cli.py -f <filename>
```

**Note**: When searching, the searches terms are case sensitive.

### Tests

The CLI has a test suite built using the `unittest` library.

To run all the tests for CLI:
```
python -m unittest .\tests\cli_test.py
```

---
<br/>
