interface ratingProps {
  rating: number | undefined | string;
  place: string;
}

const Rating = ({ rating, place }: ratingProps) => {
  const checkRating = (rating: number | undefined | string) => {
    if (rating) {
      return rating >= 6 ? 'rating_color_green' : rating >= 5 ? 'rating_color_yellow' : 'rating_color_red';
    }
  };

  return (
    <p
      className={`rating ${checkRating(rating)} ${
        place === 'card' ? 'rating_place_card' : place === 'filmPage' ? 'rating_place_filmPage' : ''
      }`}>
      {rating}
    </p>
  );
};

export default Rating;
