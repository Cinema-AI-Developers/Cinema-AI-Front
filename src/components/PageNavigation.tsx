import { Link } from 'react-router-dom';

interface PageNavigationProps {
  page: number;
  pagesCount: number;
  type: string | undefined;
}

const PageNavigation = ({ pagesCount, page, type }: PageNavigationProps) => {
  const handleArrowClick = (direction: boolean) => {
    // Реализация случая циклирования
    if (page == 1 && direction === false) {
      return `/top/${type}/${pagesCount}`;
    } else if (page == pagesCount && direction === true) {
      return `/top/${type}/1`;
    } else {
      // Реализация остальных случаев
      return direction ? `/top/${type}/${page + 1}` : `/top/${type}/${page - 1}`;
    }
  };

  return (
    <div className='page-navigation page-navigation_place_top-list'>
      <Link
        to={handleArrowClick(false)}
        className={'page-navigation__link page-navigation__link_dir_prev'}></Link>

      <p className='page-navigation__info'>{`${page} из ${pagesCount}`}</p>

      <Link
        to={handleArrowClick(true)}
        className={'page-navigation__link page-navigation__link_dir_next'}></Link>
    </div>
  );
};

export default PageNavigation;
