import { useLocation } from 'react-router';

export default function CardSkeleton() {
  const location = useLocation();

  return (
    <div className='skeleton-container'>
      <div className='skeleton animated'></div>
      <div className='skeleton-name animated'></div>
      <div className='skeleton-info'>
        <div className='skeleton-year animated'></div>
        {location.pathname !== '/' && <div className='skeleton-duration animated'></div>}
      </div>
    </div>
  );
}
