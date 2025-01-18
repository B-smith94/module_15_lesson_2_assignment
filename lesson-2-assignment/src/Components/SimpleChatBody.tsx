import { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
// Task 3
type SimpleChatBodyProps = { 
    socket: any;
    paused: boolean;
    viewMode: 'list' | 'grid';
}

const SimpleChatBody: React.FC<SimpleChatBodyProps> = ({ socket, paused, viewMode }) => {
    const [messages, setMessages] = useState([] as any); 
    const [loading, setLoading] = useState(true);

    //task 5
    useEffect(() => {
        const handleNewMessage = (message: any) => {
            if (!paused) {
                setMessages((prevMessages: any) => [...prevMessages, message]);
                setLoading(false);
            }
        };

        socket.on('message', handleNewMessage);

        return () => {
            socket.off('message', handleNewMessage);
        }

    }, [socket, paused])

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
                    <div 
                     style={{
                        display: viewMode === 'grid' ? 'grid' : 'block',
                        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(200px, 1fr))' : undefined,
                        gap: '10px',
                     }}
                    >
                      {messages.map((message: any, index: any) => (
                            <Card key={index} className="mb-2">
                                <Card.Body>
                                    <Card.Text>
                                        {message.text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}  
                    </div>
                )}
        </Container>
    )
}

export default SimpleChatBody