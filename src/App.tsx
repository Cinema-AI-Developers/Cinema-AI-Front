import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Chat from './components/Chat';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Chat /> */}
      <Footer />
    </>
  );
}

export default App;
