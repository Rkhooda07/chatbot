import { useEffect, useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';
import { Chatbot } from 'supersimpledev';

function App() {
  // Destructuring array ->
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
      "sup": "fine wbu",
      "give me a unique id": function() {
        return `Sure! Here's a unique id -> ${crypto.randomUUID()}`;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className= "app-container">
      <ChatMessages
      chatMessages= {chatMessages}
      />
      <ChatInput
        chatMessages= {chatMessages}
        setChatMessages= {setChatMessages}
      />
    </div>
  );
}

export default App