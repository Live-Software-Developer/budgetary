import React from 'react'
import { Skeleton } from '@mui/material';

const NavbarSkeleton = () => {
  return <div className='d-flex justify-content-between p-2 align-items-center'>
    <div>
      <Skeleton variant='rectangular' height={40} width={150} className='my-2 lbr' />
    </div>
    <div className='d-flex'>
      <IconTitleSkeleton />
      <IconTitleSkeleton />
      <IconTitleSkeleton />
      <IconTitleSkeleton />
      <IconTitleSkeleton />
      <IconTitleSkeleton />
      <IconTitleSkeleton />

    </div>
    <div>
      <Skeleton variant='circular' width={45} height={45} className='my-2 lbr' />
    </div>
  </div>

};

const IconTitleSkeleton = () => {
  return (
    <div className="d-flex me-2 align-items-center">
      <Skeleton variant='circular' width={25} height={25} className='my-2 lbr' />
      <Skeleton variant='rectangular' height={20} width={100} className='my-2 lbr' />
    </div>
  )
}
export default NavbarSkeleton;
