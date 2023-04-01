import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API}` },
});

interface ChatAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    text: string;
    message: {
      role: string;
      content: string;
    };
    logprobs: number;
    finish_reason: string;
    index: number;
  }[];
  error: {
    message: string;
    type: string;
    param: number;
    code: number;
  };
}

const sendMessageChatGPT = async (userMessage: string): Promise<string> => {
  return (
    await openai.post<ChatAIResponse>('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Веди себя как Дэвид, помощник в подборке фильмов в приложении CinemaAI.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })
  ).data.choices[0].message.content.trim();
};

const sendTextGPT3 = async (prompt: string): Promise<string> => {
  return (
    await openai.post<ChatAIResponse>('/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
    })
  ).data.choices[0].text.trim();
};

export const GPTapi = {
  sendMessageChatGPT,
  sendTextGPT3,
};

// const userMessage = 'Я хочу посмотреть фильм о Филлипе';
// const assistantResponse = GPTapi.sendTextGPT(userMessage);
// console.log(assistantResponse);
