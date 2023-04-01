import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API}` },
});

interface AIResponse {
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
    message: {
      role: string;
      content: string;
    };
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

const sendMessageGPT = async (userMessage: string): Promise<string> => {
  return (
    await openai.post<AIResponse>('/chat/completions', {
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

export const GPTapi = {
  sendMessageGPT,
};

// const userMessage = 'Я хочу посмотреть фильм о Филлипе';
// const assistantResponse = GPTapi.sendMessageGPT(userMessage);
// console.log(assistantResponse);
