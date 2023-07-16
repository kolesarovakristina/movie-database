import { FC } from 'react';
import { Skeleton } from 'antd';

import classes from './LoadingSkeleton.module.scss';

const LoadingSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Skeleton.Image active className={classes.wrapper__image} />
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton.Button active />
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
