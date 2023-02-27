interface CardProps {
  title: string | undefined;
  imgUrl: string;
  rating: number | undefined;
}

const Card = ({ title, imgUrl, rating }: CardProps) => {
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
    </div>
  );
};

export default Card;
