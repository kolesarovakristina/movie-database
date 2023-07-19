import { FC } from 'react';
import { Skeleton } from 'antd';

import classes from './LoadingSkeleton.module.scss';

const LoadingSkeleton: FC = () => (
  <div className={classes.wrapper}>
    <Skeleton active paragraph={{ rows: 5 }} />
  </div>
);

export default LoadingSkeleton;
