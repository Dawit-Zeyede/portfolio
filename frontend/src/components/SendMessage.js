import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessageToStudent } from '../services/jobService';
import '../styles/SendMessage.css';

const SendMessage = () => {
  const { studentId } = useParams();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    setSending(true);
    try {
      console.log(`Sending message to /api/send-message/${studentId} with body:`, { message });
      await sendMessageToStudent(studentId, message);
      setSuccess('Message sent successfully!');
      setError('');
    } catch (err) {
      console.error('Error while sending message:', err);
      setError(err.message || 'Failed to send message. Please try again later.');
      setSuccess('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="send-message-container">
      <h1>Send Message to Applicant</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Write your message here"
      />
      <button
        onClick={handleSendMessage}
        disabled={sending || !message}
      >
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
};

export default SendMessage;
