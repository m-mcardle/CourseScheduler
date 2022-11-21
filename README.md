# Sprint 8
This branch contains the code that was created by team 205 to meet requirements for sprint eight. This sprint was focused on adding Winter 2023 courses and filtering options.

https://20.168.192.248/ <- check out our web application using this link!


# Repository

This next section describes the purpose of each subdirectory in this repo. For more specific information about a given service, please view each directory's `README`.

## /api 📊

Contains code for our Flask API that provides course information. Accessible at [20.168.192.248/api/{query}](https://20.168.192.248/api/courses). Hosted through a reverse proxy that forwards all traffic to our gunicorn WSGI that is hosting the app on port 8080. This WSGI is kept running through the use of `pm2`. All code written in this directory is linted through `pylint`.

Is automatically deployed through GitLab CI/CD by copying over the latest `api` code to the server each time changes made to `main`, and then reloads the `pm2` process with the new code.

## /cli 🧑‍💻

Contains code for our Python HTML parser and CLI that extracts course information from a given webpage and allows the user to search through it via a CLI. The output from `parser.py` is the source of our data used in our API.

Contains unit tests to ensure our data remains parsed as expected. These unit tests are run each time changes are made to the code in this directory through GitLab CI/CD.

## /client 🖥

Contains code for our React Web Application that provides an interface for a user to generate a course schedule. Fetches data from our Flask API and displays it in a calendar. Accessible at [20.168.192.248](https://20.168.192.248). Statically served through NGINX by placing our compiled application in the `/www` directory. All code written in this directory is linted through `eslint`.

Contains unit tests that are automatically ran each time a commit is made that adjusts code in this directory. Also is automatically re-deployed whenever new changes are made to the `main` branch.

Contains an 'end-to-end' test suite built using the Cypress framework. Simulates common user flows and asserts that our production environment behaves as expected. Cypress has been integrated into our GitLab CI/CD and will perform a test run whenever the `main` branch is updated. Videos of the `e2e` testing are stored as artifacts and more detailed information about each run can be viewed on our Cypress dashboard [here](https://dashboard.cypress.io/projects/q43meb/).

## /nginx 📡

Contains our NGINX configuration files along with bash script to manage fresh installation and applying changes to the configuration.

# Video Demo
[![thumbnail](https://i.etsystatic.com/10919371/r/il/155a7d/1563938723/il_570xN.1563938723_1rmr.jpg)](https://share.vidyard.com/watch/tKSsQRMkjDD7biBG5NubXG?)
