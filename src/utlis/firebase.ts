import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'cinema-ai.firebaseapp.com',
  projectId: 'cinema-ai',
  storageBucket: 'cinema-ai.appspot.com',
  messagingSenderId: '725938767980',
  appId: '1:725938767980:web:e817f01fc5db6475263049',
  measurementId: 'G-01QDR6M1ZE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
