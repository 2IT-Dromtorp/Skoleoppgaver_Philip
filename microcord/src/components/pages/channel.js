import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/channel.css';

function Channel() {
    const [messages, setMessages] = useState([]);
    const [server, setServer] = useState({});
    const { serverid, channelid } = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const body = {
                    serverid,
                    channelid,
                };
                const response = await fetch('http://localhost:8080/microcord/api/channel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMessages(data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [serverid, channelid]);

    return (
        <div className='channel-root'>
            <ul className='channel'>
                {messages.map((message) => (
                    <li key={message._id} className='channel-message'>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Channel;