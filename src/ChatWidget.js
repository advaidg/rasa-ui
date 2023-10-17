import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

const ChatWidget = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    addResponseMessage('Welcome to the chatbot! How can I assist you today?');
  }, []);

  const handleNewUserMessage = (newMessage) => {

    axios
      .post('http://localhost:5005/webhooks/rest/webhook', {
        message: newMessage,
      })
      .then((response) => {
        const botResponses = response.data;
        botResponses.forEach((botResponse) => {
          addResponseMessage(botResponse.text);
        });
      })
      .catch((error) => {
        console.error('Error sending message to Rasa bot:', error);
      });
  };
  
  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat with Bot"
        subtitle="Ask me anything!"
      />
    </div>
  );
};

export default ChatWidget;
