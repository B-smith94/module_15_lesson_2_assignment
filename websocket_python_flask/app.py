from web_socket_server import WebSocketServer, socketio, app
app = WebSocketServer().create_app()

@socketio.on('connect') 
def handle_connect():
    print('Client connected')
    socketio.emit('message', {'text': 'Connection Successful!'})

@socketio.on('disconnect')
def handle_connect():
    print('Client disconnected')

@socketio.on('message') 
def handle_message(message): 
    try: 
        print(f'Recieved message: {message}')
        socketio.emit('message', message) 
    except Exception as e:
        print(f"Error handling message: {e}")

if __name__ == '__main__':
    socketio.run(app)