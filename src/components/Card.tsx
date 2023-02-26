interface CardProps {
  title: string | undefined;
  imgUrl: string;
}

const Card = ({ title, imgUrl }: CardProps) => {
  return (
    <div className='card'>
      <img src={imgUrl} alt={title} className='card__photo' />
    </div>
  );
};

export default Card;
