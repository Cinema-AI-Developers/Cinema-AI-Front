interface CardProps {
  title: string | undefined;
  imgUrl: string;
  rating: number | undefined | string;
  year: string | undefined;
  filmLength: string | undefined;
}

const Card = ({ title, imgUrl, rating, year, filmLength }: CardProps) => {
  const checkRating = (rating: number | undefined | string) => {
    if (rating) {
      return rating >= 6 ? 'card__rating_color_green' : 'card__rating_color_red';
    }
  };

  const validateRating = (rating: number | undefined | string) => {
    return rating && rating.toString().includes('%') ? false : true;
  };

  return (
    <div className='card'>
      <button className='card__button'>
        {validateRating(rating) && <p className={`card__rating ${checkRating(rating)}`}>{rating}</p>}
        <img src={imgUrl} alt={title} className='card__photo' />
      </button>
      <p className='card__title'>{title}</p>
      <div className='card__info-container'>
        {year && <p className='card__year'>Год: {year}</p>}
        {filmLength && <p className='film-length'>Время: {filmLength}</p>}
      </div>
    </div>
  );
};

export default Card;
