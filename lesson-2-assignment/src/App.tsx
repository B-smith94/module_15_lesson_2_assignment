import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import SimpleChatBody from './Components/SimpleChatBody'
import SimpleMessageInput from './Components/SimpleMessageInput'
import { Container, Button, Form } from 'react-bootstrap'

//Task 2
const socket = io('http://127.0.0.1:5000', {
  // Task 4
  reconnection: true,
  reconnectionAttempts: 3, // number or retries before giving up
  reconnectionDelay: 2000, // delay between retries
  timeout: 5000, // connection timeout in ms
}) 

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button onClick={() => setPaused(!paused)}>
            {paused ? 'Resume Updates' : 'Pause Updates'}
          </Button>
          <Form.Select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'list' | 'grid')}
            style={{ margin: '10px', width: '200px' }}
          >
            <option value='list'>List View</option>
            <option value='grid'>Grid View</option>
          </Form.Select>
          <Container>
            <h2>Chat Room</h2>
            <Container>
              <SimpleChatBody socket={socket} paused={paused} viewMode={viewMode}/>
            </Container>
              <SimpleMessageInput socket={socket} />
          </Container>  
        </p>
    </div>
  );
};

export default App
