# Sprint 5
This branch contains the code that was created by team 205 to meet requirements for sprint five. This sprint was focused on 

https://20.168.192.248/ <- check out our web application using this link!

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
- Open ports 3000, 8000, and 80

## Install Script Usage:
- cd team205_project
- cd client
- ./install.sh


## How to Start the Server for the First Time:
- Start VM in the Azure console
  - Make sure ports 3000, 8000, and 80 are open
- SSH into VM
- Clone Sprint 5 from GitLab
- Use install script 
  - to restart server re run install script
- Follow the Readme.md in the api folder (Note the demo  wasn't updated to show this)
  - cd api
  - python3 -m venv venv
  - . venv/bin/activate
  - pip install flask
  - pip install gunicorn
  - gunicorn -w 4 -b 0.0.0.0:8080 'app:app'
    - runs the server in the forground, restart flask server by ctrl^C and running above again
  - pm2 "gunicorn -w 4 -b 0.0.0.0:8080 'app:app'"
    - runs the flask server in the background, use command below to restart flask server
    - pm2 reload all
- enjoy

# Video Demo
[![thumbnail](https://i.etsystatic.com/10919371/r/il/155a7d/1563938723/il_570xN.1563938723_1rmr.jpg)](https://share.vidyard.com/watch/pHoNQmrYd2oZ4k9dvusd9R?)
