import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import chatIcon from '../assets/chat.png';
import sendIcon from '../assets/send.svg';
import { GPTapi, Role } from '../utlis/GPTapi';

interface Message {
  content: string;
  side: 'left' | 'right';
}

const Chat = (): JSX.Element => {
  const [chatOpen, toggleChat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        'Привет! Я - Дэвид, помощник в подборке фильмов на сайте CinemaAI. Я создан для того, чтобы помочь тебе найти подходящий фильм для просмотра на основе твоих интересов и предпочтений. Чем я могу тебе помочь?',
      side: 'left',
    },
    // { content: 'Hello', side: 'right' },
    // {
    //   content:
    //     'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.    ',
    //   side: 'left',
    // },
    // { content: 'wow', side: 'left' },
    // { content: 'im not alone', side: 'left' },
    // { content: 'im shocked', side: 'left' },
    // { content: 'me too', side: 'right' },
  ]);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage } = useMutation({
    mutationFn: (userMessage: string) => GPTapi.sendMessageChatGPT(userMessage, Role.CHAT),
    onSuccess: (data) => {
      setMessages((oldMessages) => {
        let messages = import.meta.env.DEV ? [...oldMessages] : oldMessages;
        messages.push({ content: data, side: 'left' });
        return messages;
      });
    },
  });

  const handleSendMessage = useCallback(() => {
    //fix double messages
    console.log('message doesnt send because there is no api for it');
    if (message) {
      setMessages((oldMessages) => {
        let messages = import.meta.env.DEV ? [...oldMessages] : oldMessages;
        messages.push({ content: message, side: 'right' });
        return messages;
      });
      setMessage('');
      sendMessage(message);
    }
  }, [message]);

  const handleOpenChat = () => {
    toggleChat(!chatOpen);
  };

  useEffect(() => {
    if (messagesAreaRef.current) messagesAreaRef.current.scrollTo(0, messagesAreaRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      <div className={`${chatOpen ? 'chat' : 'chat-closed'}`}>
        <div className={`${chatOpen ? 'chat__window' : 'chat__window-closed'}`}>
          <div className='messagesArea' ref={messagesAreaRef}>
            {messages.map((message, i) => (
              <div className='messagesArea-line' key={`${i} ${message}`}>
                <ChatMessage content={message.content} side={message.side} />
              </div>
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
            <button className='sendMessage__button' onClick={handleSendMessage}>
              <img className='sendMessage__button-image' src={sendIcon} alt='Send message' />
            </button>
          </div>
        </div>
      </div>
      <button className='chat__button' onClick={handleOpenChat}>
        <img className='chat__button-image' src={chatIcon} alt='Open chat' />
        {/* <span>Открыть чат</span> */}
      </button>
    </>
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
