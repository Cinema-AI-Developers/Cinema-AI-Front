import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const navigate = useNavigate();

  return (
    <header className='header'>
      <Link to='/' className='header__title'>
        Cinema AI
      </Link>
      <div className='header__chat-block'>
        <input
          placeholder='Название фильма'
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          className='header__chat-input'></input>
        <button onClick={() => navigate(`/search/${inputKeyword}/1`)} className='header__chat-button'>
          Поиск
        </button>
      </div>
    </header>
  );
};

export default Header;
