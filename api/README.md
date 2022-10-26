# API

This is our team's API to provide course information from a Flask server.

## Starting Server

This should start the server to external IPs on port 8000.

```
python3 -m venv venv
. venv/bin/activate
pip install flask
pip install gunicorn
gunicorn -b 0.0.0.0:8080 'app:app'
```
