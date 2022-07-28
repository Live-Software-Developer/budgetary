import { Skeleton } from '@mui/material';

const MainSkeleton = () => {
  return (
    <div className="page-skeleton">
      <div className="page-skeleton-header">
        <Skeleton variant='h1' className="sbr" />
      </div>
      <div className="page-skeleton-body">
        <div className='my-3'><Skeleton variant='rectangular' height={250} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={250} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={250} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={250} className='my-2 lbr' /></div>

      </div>
    </div>
  )
};

export default MainSkeleton;
