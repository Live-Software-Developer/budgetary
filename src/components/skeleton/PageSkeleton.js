import { Skeleton } from '@mui/material';

const PageSkeleton = () => {
  return (
    <div className="page-skeleton mt-4">
      <div className="page-skeleton-header">
        <Skeleton variant='h1' className="sbr" />
      </div>
      <div className="page-skeleton-body">
        <div className='my-3'><Skeleton variant='rectangular' height={350} className='my-2 lbr' /></div>

      </div>
    </div>
  )
};

export default PageSkeleton;
