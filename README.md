# Sprint 5
This branch contains the code that was created by team 205 to meet requirements for sprint five. This sprint was focused on creating and demonstrating request and response paths across our stack. This involved updating the frontend with interactable interface, building a flask server with Gunicorn, and connecting everything together.

https://20.168.192.248/ <- check out our web application using this link!


# Repository

This next section describes the purpose of each subdirectory in this repo. For more specific information about a given service, please view each directory's README.

## /api

Contains code for our Flask API that provides course information. Accessible at [20.168.192.248/api/{query}](https://20.168.192.248/api/courses). Hosted through a reverse proxy that forwards all traffic to our gunicorn WSGI that is hosting the app on port 8080. This WSGI is kept running through the use of `pm2`.

Is automatically deployed through GitLab CI/CD by copying over the latest `api` code to the server each time changes made to `main`, and then reloads the `pm2` process with the new code.

## /cli

Contains code for our Python HTML parser and CLI that extracts course information from a given webpage and allows the user to search through it via a CLI. The output from `parser.py` is the source of our data used in our API.

Contains unit tests to ensure our data remains parsed as expected. These unit tests are run each time changes are made to the code in this directory through GitLab CI/CD.

## /client

Contains code for our React Web Application that provides an interface for a user to generate a course schedule. Fetches data from our Flask API and displays it in a calendar. Accessible at [20.168.192.248](https://20.168.192.248). Statically served through NGINX by placing our compiled application in the `/www` directory.

Contains unit tests that are automatically ran each time a commit is made that adjusts code in this directory. Also is automatically re-deployed whenever new changes are made to the `main` branch.

## /excel

Contains our tool's prototype that was built in Excel using VBA. We have kept it because the logic used to parse the meeting information is still relevant now that we are re-implementing this functionality.

### Technology Stack
Frontend Framework
- React
- JavaScript
 
Component Library
- Material UI
 
VM
- Azure - $100 credit
 
Linux
- Ubuntu
 
Backend Server
- Flask (Python)
- WSGI: Gunicorn


## Prerequisites:
- Azure VM with Ubuntu Image
- Open ports 443 and 80

## Install Script Usage:
- `cd team205_project`
- `cd client`
- `./install.sh`


## How to Start the Server for the First Time:
- Start VM in the Azure console
  - Make sure ports 443 and 80 are open
- SSH into VM
- Clone Sprint 5 from GitLab
- Use install script 
  - to restart server re run install script
- Follow the Readme.md in the api folder (Note the demo  wasn't updated to show this)
  - `cd api`
  - `python3 -m venv venv`
  - `. venv/bin/activate`
  - `pip install flask`
  - `pip install gunicorn`
  - `gunicorn -w 4 -b 0.0.0.0:8080 'app:app'`
    - runs the server in the forground, restart flask server by ctrl^C and running above again
  - `pm2 "gunicorn -w 4 -b 0.0.0.0:8080 'app:app'"`
    - runs the flask server in the background
    - `pm2 reload all` to restart flask server
- enjoy

# Video Demo
[![thumbnail](https://i.etsystatic.com/10919371/r/il/155a7d/1563938723/il_570xN.1563938723_1rmr.jpg)](https://share.vidyard.com/watch/qWTJtqAvRKeVmLFMaKJmAW?)
