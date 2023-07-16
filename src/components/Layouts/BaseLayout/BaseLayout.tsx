import classnames from 'classnames';
import { FC, ReactNode } from 'react';

import classes from './BaseLayout.module.scss';

type TBaseLayoutProps = {
  readonly children: ReactNode;
};

const BaseLayout: FC<TBaseLayoutProps> = ({ children }) => (
  <div className={classes.wrapper}>
    <div className={classnames(classes.content, 'scrollbar-thin')}>
      <div className={classes.content__items}>{children}</div>
    </div>
  </div>
);

export default BaseLayout;
