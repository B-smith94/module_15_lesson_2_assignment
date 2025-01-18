import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import SimpleChatBody from './Components/SimpleChatBody'
import SimpleMessageInput from './Components/SimpleMessageInput'
import { Container } from 'react-bootstrap'

//Task 2
const socket = io('http://127.0.0.1:5000') 

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Connecting to server...");
    
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true)
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false)
    });
    // Task 4
    socket.on("connect_error", (err: any) => {
      console.error("Connection error:", err.message);
      setError("Connection error. Please try again.")
    });
  }, [isConnected]);


// Task 3
  return (
    <div>
      <h1>Welcome to React with Sockets</h1>
        <p>Connection Status: </p>
          {isConnected? "Connected" : "Not connected"}
        <p>
          <Container>
            <h2>Chat Room</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Container>
              <SimpleChatBody socket={socket} />
            </Container>
              <SimpleMessageInput socket={socket} />
          </Container>  
        </p>
    </div>
  );
};

export default App
