interface CardProps {
  title: string | undefined;
  imgUrl: string;
  rating: number | undefined;
  year: string | undefined;
  filmLength: string | undefined;
}

const Card = ({ title, imgUrl, rating, year, filmLength }: CardProps) => {
  const checkRating = (rating: number | undefined) => {
    if (rating) {
      return rating >= 6 ? 'card__rating_color_green' : 'card__rating_color_red';
    }
    return 'card__rating_color_none';
  };

  return (
    <div className='card'>
      <button className='card__button'>
        <p className={`card__rating ${checkRating(rating)}`}>{rating}</p>
        <img src={imgUrl} alt={title} className='card__photo' />
      </button>
      <p className='card__title'>{title}</p>
      <div className='card__info-container'>
        <p className='card__year'>Год: {year === undefined ? 'неизвестно' : year}</p>
        <p className='card__film-length'>Время: {filmLength === undefined ? 'неизвестно' : filmLength}</p>
      </div>
    </div>
  );
};

export default Card;
