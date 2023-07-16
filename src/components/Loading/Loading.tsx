import { FC } from 'react';
import { Spin } from 'antd';

import classes from './Loading.module.scss';

const Loading: FC = () => (
  <div className={classes.wrapper}>
    <Spin size="large" />
  </div>
);

export default Loading;
