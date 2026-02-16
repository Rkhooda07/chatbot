import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './app.css';
import RobotPfp from './assets/robot.png';
import UserPfp from './assets/user.png';
import LoadingSpinner from './assets/loading-spinner.gif';

function InputBox({ chatMessages, setChatMessages }) {
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
        id: crypto.randomUUID()
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
        id: crypto.randomUUID()
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

function ChatMessage({ message, sender }) {
  // const message = props.message;
  // const sender = props.sender;
  // const { message, sender } = props;

  /*
  if (sender === 'user') {
    return (
      <>
        <div>
          {message}
          <img src="user.png" width= "50" />  
        </div>
      </>
    );
  } else {
    return (
      <div>
        <img src="robot.png" width= "50" />
        {message}
      </div>
    );
  }
  */

  return (
    <div className= {
      sender === 'user' 
        ? "chat-message-user" 
        : "chat-message-robot"
    }>
      {sender === 'robot' && (
        <img className= "chat-message-pfp" src= {RobotPfp} />
      )}
      <div className= "chat-message-text">
        { message }
      </div>
      {sender === 'user' && (
        <img className= "chat-message-pfp" src= {UserPfp} />
      )}
    </div>
  ); 
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  
  if (chatMessages.length === 0) {
    return (
      <div className="chat-messages-container" style={{ textAlign: 'center', color: 'gray' }}>
        Welcome to the chatbot project! Send a message using the textbox below.
      </div>
    )
  }

  return (
    <div 
      className= "chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            key = {chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  // Destructuring array ->
  const [chatMessages, setChatMessages] = useState([]);
  
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className= "app-container">
      <ChatMessages
      chatMessages= {chatMessages}
      />
      <InputBox
        chatMessages= {chatMessages}
        setChatMessages= {setChatMessages}
      />
    </div>
  );
}

export default App