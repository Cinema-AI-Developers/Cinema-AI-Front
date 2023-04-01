import { useCallback, useState } from 'react';
import sendIcon from '../assets/send.svg';

interface Message {
  content: string;
  side: 'left' | 'right';
}

const Chat = (): JSX.Element => {
  const [chatOpen, toggleChat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { content: 'Hi there', side: 'left' },
    { content: 'Hello', side: 'right' },
    { content: 'wow', side: 'left' },
    { content: 'im not alone', side: 'left' },
    { content: 'im shocked', side: 'left' },
    { content: 'me too', side: 'right' },
  ]);

  const sendMessage = useCallback(() => {
    //fix double messages
    console.log('message doesnt send because there is no api for it');
    if (message) {
      setMessages((messages) => {
        messages.push({ content: message, side: 'right' });
        return messages;
      });
      setMessage('');
    }
  }, [message]);

  return (
    <div className='chat'>
      <div className='chat__window' style={{ visibility: chatOpen ? 'visible' : 'hidden' }}>
        <div className='messagesArea'>
          {messages.map((message, i) => (
            <ChatMessage content={message.content} side={message.side} key={`${i} ${message}`} />
          ))}
        </div>
        <div className='sendMessage'>
          <textarea
            placeholder='Напишите ваше сообщение здесь'
            className='sendMessage__input'
            autoComplete='off'
            onChange={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button className='sendMessage__button' onClick={sendMessage}>
            <img className='sendMessage__button-image' src={sendIcon} alt='Send message' />
          </button>
        </div>
      </div>
      <button className='chat__button' onClick={() => toggleChat(!chatOpen)}>
        Open chat
      </button>
    </div>
  );
};

const ChatMessage = ({ content, side }: Message): JSX.Element => {
  return (
    <div className='messageBubble' data-align={side}>
      {content}
    </div>
  );
};

export default Chat;
