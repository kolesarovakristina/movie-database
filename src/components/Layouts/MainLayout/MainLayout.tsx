import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';

import classes from './MainLayout.module.scss';

const MainLayout: FC = () => {
  return (
    <div className={classes.wrapper}>
      <header className={classes.wrapper__header}>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
