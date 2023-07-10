import axios from 'axios';

const SD = axios.create({
  baseURL: 'https://127e-34-132-153-178.ngrok.io', //hihi haha. Not working? hihihi
});

const getImage = async (prompt: string) => {
  return await SD.get(`/?prompt=${prompt}`);
};

export const SDapi = {
  getImage,
};
