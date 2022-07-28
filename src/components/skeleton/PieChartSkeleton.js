import { Skeleton } from '@mui/material';

const PieChartSkeleton = () => {
  return (
    <div className="page-skeleton mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
      <Skeleton variant='circular' height={70} width={70} className='my-2 lbr' />
    </div>
  )
};

export default PieChartSkeleton;
