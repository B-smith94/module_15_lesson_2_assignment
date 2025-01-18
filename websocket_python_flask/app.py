from web_socket_server import WebSocketServer, socketio, app
# substantiate server
app = WebSocketServer().create_app()
# setting up socketio decorators
# used to register SocketIO event handler
# runs function when it catches 'connect' or disconnect' events
# @<domain> = decorator

# Handling WebSocket Connections
@socketio.on('connecte') 
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_connect():
    print('Client disconnected')
# sending and receiving data over Websockets
@socketio.on('message') 
def handle_message(message): 
    print(f'Recieved message: {message}')
    socketio.emit('message', message) # sends a message from server to

# runs flask application with addition of socketIO instance
# listens for websocket connection and runs code based on status
if __name__ == '__main__':
    socketio.run(app)