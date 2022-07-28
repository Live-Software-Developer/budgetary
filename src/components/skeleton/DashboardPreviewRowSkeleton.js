import { Skeleton } from '@mui/material';

const DashboardPreviewRowSkeleton = () => {
  return (
    <div className="page-skeleton mt-3">
      <div className='my-3'><Skeleton variant='h2' height={26} className='my-2 lbr' /></div>
      <div className='my-3'><Skeleton variant='rectangular' height={250} className='my-2 lbr' /></div>
    </div>
  )
};

export default DashboardPreviewRowSkeleton;
