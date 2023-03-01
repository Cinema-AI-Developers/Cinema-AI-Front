import { useParams, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, TopTypes } from '../utlis/api';
import Card from '../components/Card';

const TopList = () => {
  let { type, page } = useParams();

  const { data: filmsData, isLoading: filmsLoading } = useQuery({
    queryKey: ['top', { type, page }],
    queryFn: () => api.getTopFilms(type as TopTypes, parseInt(page || '1')).then((res) => res.data),
  });

  const pageInt = parseInt(page || '1');
  const pagesCount = type === 'TOP_100_POPULAR_FILMS' ? 20 : filmsData?.pagesCount;

  const handleArrowClick = (direction: boolean) => {
    // Реализация случая циклирования
    if (parseInt(page || '') == 1 && direction === false) {
      return `/top/${type}/${pagesCount}`;
    } else if (parseInt(page || '') == pagesCount && direction === true) {
      return `/top/${type}/1`;
    } else {
      // Реализация остальных случаев
      return direction ? `/top/${type}/${pageInt + 1}` : `/top/${type}/${pageInt - 1}`;
    }
  };

  return filmsLoading ? (
    <p>loading</p>
  ) : (
    <>
      <div className='cards-container'>
        {filmsData?.films.map((filmInfo) => (
          <Card
            key={filmInfo.filmId}
            title={filmInfo.nameRu}
            imgUrl={filmInfo.posterUrlPreview}
            rating={filmInfo.rating}
            year={filmInfo.year}
            filmLength={filmInfo.filmLength}
          />
        ))}
      </div>

      <div className='page-navigation page-navigation_place_top-list'>
        <NavLink
          to={handleArrowClick(false)}
          className={'page-navigation__link page-navigation__link_dir_prev'}></NavLink>

        <NavLink
          to={handleArrowClick(true)}
          className={'page-navigation__link page-navigation__link_dir_next'}></NavLink>
      </div>
    </>
  );
};

export default TopList;
