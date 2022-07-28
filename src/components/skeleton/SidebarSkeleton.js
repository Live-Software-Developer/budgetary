import { Skeleton } from '@mui/material';

const SidebarSkeleton = () => {
  return (
    <div className="page-skeleton mt-4 mx-auto" style={{ width: '270px' }}>
      <div className="page-skeleton-header">
        <Skeleton variant='rectangular' className="sbr" height={150} />
      </div>
      <div className="page-skeleton-body">
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>
        <div className='my-3'><Skeleton variant='rectangular' height={40} className='my-2 lbr' /></div>

      </div>
    </div>
  )
};

export default SidebarSkeleton;
