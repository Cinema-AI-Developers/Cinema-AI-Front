import { useQuery } from '@tanstack/react-query';
import { api } from '../utlis/api';
import Card from '../components/Card';

interface GenreLineProps {
  genreId: number;
  genreName: string;
}

export default function GenreLine({ genreId, genreName }: GenreLineProps) {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['filminfo', genreId],
    queryFn: () => api.getFilmsByFilter(genreId),
  });
  return isLoading ? (
    <p>loading</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    films && (
      <section className='genre-line'>
        <h3 className='genre-line__title'>{genreName}</h3>

        <div className='genre-line__container'>
          {films.items
            .filter((filmInfo) => filmInfo.nameRu)
            .map((filmInfo) => {
              return (
                <Card
                  key={filmInfo.kinopoiskId}
                  title={filmInfo.nameRu}
                  imgUrl={filmInfo.posterUrlPreview}
                  rating={filmInfo.ratingKinopoisk}
                  year={filmInfo.year}
                  filmLength={filmInfo.filmLength}
                  filmId={filmInfo.kinopoiskId}
                />
              );
            })
            .slice(0, 5)}
        </div>
      </section>
    )
  );
}
