# Establishing a flask-socketIO server in python
# Dependencies: flask, flask-socketio
# 'pip install "" '
# Flask-SocketIO -- Enables real-time communicatin by integrating SocketIO 
# SocketIO -- Javascript library for WebSocket
# Goal: Encapsulate logic for creating a flask app and provide socketIO support
# very simple example - minimal configuration

from flask import Flask;
from flask_socketio import SocketIO

socketio = SocketIO()
app = Flask(__name__) # Substantiate Flask application

class WebSocketServer: # class - defines objects
    def __init__(self, debug=False):  # def <function name>, __init__(self, parameters) - constructor to initialize attributs
        self.create_app(debug) # can set debug to true or false, depending on if we want debug to be on or no
        
    def create_app(self, debug=False):
        #Create an Application
        
        app.debug = debug 
        # bind socketIO to flask app
        socketio.init_app(app, cors_allowed_origins="*") # cors_allowed_origins - defines what can access flask application
        return app # returns app to be used elsewhere

# This method is more modular and reusable
# Helps with scope management
# If it expands, helps maintain socketIO stuff
# easier to debug
    