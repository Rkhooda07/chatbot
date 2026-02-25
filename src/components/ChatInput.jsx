import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInput(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText.trim() === '' || isLoading) {
      return;
    }

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className='loading-spinner' src={LoadingSpinner} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className= "input-container">
      <input 
        placeholder = "Send a message to Chatbot" 
        size= "30" 
        type="text" 
        onChange= {saveInput}
        onKeyDown= {handleKeyDown}
        value= {inputText}
        disabled= {isLoading}
        className= "input-box"
      />
      <button 
        onClick= {sendMessage}
        className= "send-button"
      >Send</button>
    </div>
  );
}