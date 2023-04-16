import { useNavigate } from 'react-router';
import Rating from './Rating';

interface CardProps {
  title: string | undefined;
  imgUrl: string;
  rating: number | undefined | string;
  year: string | undefined;
  filmLength: string | undefined;
  filmId: number;
}

const Card = ({ title, imgUrl, rating, year, filmLength, filmId }: CardProps) => {
  const validateRating = (rating: number | undefined | string) => {
    return rating && rating.toString().includes('%') ? false : true;
  };

  //Редирект на страницу фильма при клике на карточку
  let navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/films/${filmId}`);
  };

  return (
    <div className='card'>
      <button className='card__button' onClick={onCardClick}>
                <img src={imgUrl} alt={title} className='card__photo' />
      </button>
      <div style={
        {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }
      }>
        <div className='card__title' onClick={onCardClick}>
          {title}
        </div>
        <div className='card__info-container' id='upper'>
          {year && <div className='card__year'> {year} </div>}
        </div>
      </div>
      <div className='card__info-container' id='lower'>
        {filmLength && <p className='film-length'> {filmLength[1]}ч {filmLength[3]}м</p>}
        {validateRating(rating) && <Rating rating={rating} place='card__info-container' />}
      </div>
    </div>
  );
};

export default Card;
