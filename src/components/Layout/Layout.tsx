// src/components/Layout/Layout.tsx
import { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import InteractiveButton from '../../UI/InteractiveButton/InteractiveButton';
import VacancyForm from '../../components/VacancyForm/VacancyForm';

const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
      <InteractiveButton
          iconSrc="/favicon.ico" 
          tooltipText="Отправка заявок"
          Component={VacancyForm} 
        />
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
