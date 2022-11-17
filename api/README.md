# /api

This is our team's API to provide course information from a Flask server.

## Endpoints

### [`/f22`](https://20.168.192.248/api/f22)

This endpoint returns course information for courses in Fall 2022. Courses can be filtered by passing parameters to the request in the format: `/w22?{field}={value}`.

Example:
```
/f22?Monday=No
```


### [`/w23`](https://20.168.192.248/api/w23)

This endpoint returns course information for courses in Winter 2023. Courses can be filtered by passing parameters to the request in the format: `/w23?{field}={value}`.

Example:
```
/w23?Monday=No
```

### [`/course`](https://20.168.192.248/api/course/Faculty/Klotz)

This endpoints returns courses that match a given field-value pair. For example you can provide a course name and it will find all the courses that match that string. To switch between semesters (f22 and w23), pass a URL parameter of either `f22` or `w23`. If no semester is specified f22 is the default.

Example:
```
/course/Faculty/Klotz?f22
```

### Valid Filter Fields

* Monday
* Tuesday
* Wednesday
* Thursday
* Friday
* DE
* Seminar
* Lecture
* Lab
* Afternoon
* Morning
* \# of Meetings

## Starting Server

This should start the server to external IPs on port 8080.

```
python3 -m venv venv
. venv/bin/activate
pip install flask
pip install pylint
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8080 'app:app'
```

## pm2

`pm2` is used to manage the long-running process.

To reload:
```
pm2 reload 0
```

To view processes:
```
pm2 list
```
