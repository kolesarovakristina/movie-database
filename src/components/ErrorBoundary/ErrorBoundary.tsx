import { FC } from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Result } from 'antd';

import { EPathsEnum } from 'enums/PathsEnum';
import { EApiActionsEnum } from 'enums/ApiActionsEnum';
import { EErrorMessageEnum } from 'enums/ErrorMessageEnum';

import classes from './ErrorBoundary.module.scss';

const ErrorBoundary: FC = () => {
  const error: any = useRouteError();

  console.error(error);

  if (
    error.status === 404 &&
    error.data.startsWith(EApiActionsEnum.WRONG_ROUTE)
  ) {
    return (
      <div className={classes.holder}>
        <div>
          <Result
            status="404"
            title={EErrorMessageEnum.NOT_EXIST}
            extra={
              <div className={classes.wrapper}>
                <Link to={EPathsEnum.HOME} replace>
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
