import { FC } from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Result } from 'antd';

import classes from './ErrorBoundary.module.scss';

enum EErrorBoundaryMessages {
  NOT_EXIST = 'Sorry the page you are looking for does not exist.',
}

const ErrorBoundary: FC = () => {
  const error: any = useRouteError();

  console.error(error);

  if (
    error.status === 404 &&
    error.data.startsWith('Error: No route matches URL')
  ) {
    return (
      <div className={classes.holder}>
        <div>
          <Result
            status="404"
            title={EErrorBoundaryMessages.NOT_EXIST}
            extra={
              <div className={classes.wrapper}>
                <Link to="/" replace>
                  Home
                </Link>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  return <div>{error.message}</div>;
};

export default ErrorBoundary;
