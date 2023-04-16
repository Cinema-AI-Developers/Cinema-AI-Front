import { useNavigate } from 'react-router';
const Header = () => {
  let navigate = useNavigate();
  return <h1>
      <div onClick={()=>{
        navigate('/');
      }}
        className='header'>
          Cinema AI
      </div>
    </h1> 
};


export default Header;
