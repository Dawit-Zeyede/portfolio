import React, { useEffect, useState } from 'react';
import socket from '../services/socket';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/api/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const resolveRecipientId = async () => {
    try {
      const response = await axios.get(`/api/user/resolve/${recipientUsername}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecipientId(response.data.userId);
    } catch (error) {
      console.error('Error resolving recipient ID:', error);
      alert('Could not find user with the specified username.');
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    if (!recipientId) {
      alert('Please resolve the recipient username first.');
      return;
    }

    socket.emit('sendMessage', {
      senderId: userId,
      receiverId: recipientId,
      message,
    });

    setMessages((prev) => [...prev, { senderId: userId, message }]);
    setMessage('');
  };

  return (
    <div className="container mt-5">
      <h2>Chat</h2>

      <div className="mb-3">
        <label htmlFor="recipientUsername" className="form-label">
          Recipient Username
        </label>
        <div className="d-flex">
          <input
            type="text"
            id="recipientUsername"
            className="form-control"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={resolveRecipientId}
          >
            Resolve
          </button>
        </div>
      </div>

      <div className="chat-messages mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.senderId === userId ? 'Me' : msg.senderId}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          className="btn btn-primary mt-2"
          onClick={sendMessage}
          disabled={!recipientId}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
