import { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
// Task 3
type SimpleChatBodyProps = { 
    socket: any;
}

const SimpleChatBody: React.FC<SimpleChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState([] as any); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.on('message', (message: any) => { 
            setMessages([...messages, message]); 
            setLoading(false);
        });
    }, [socket, messages])

    return (
        <Container
         style={{
            marginTop: '40px',
            background: 'lightblue',
            padding: '20px',
            borderRadius: '10px',
         }}
        > {/* task 4 */}
            {loading? (<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>) : (
                    messages.map((message: any, index: any) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text>
                            {message.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )))}
        </Container>
    )
}

export default SimpleChatBody