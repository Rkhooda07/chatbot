import RobotPfp from '../assets/robot.png';
import UserPfp from '../assets/profile-1.jpg';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
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