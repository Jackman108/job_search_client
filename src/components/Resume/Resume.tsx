import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeProps } from '../../Interfaces/InterfaceResume.types';
import Button from '../../UI/Button/Button';
import { useAuth } from '../../context/useAuthContext';
import styles from './Resume.module.css';

const Resume: FC<ResumeProps> = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleGetClick = () => {
    navigate('/resume/');
  };
  
  return (
    <section className={styles.resumeSection}>
    {token ?  (
      <div className={styles.resumeContainer}>
        <Button onClick={handleGetClick} variant="primary">
        резюме
      </Button>
      </div>
    ) : (      
      <h2 onClick={handleGetClick} className={styles.resumeTitle}>
      {'Нужно авторизоваться'}
    </h2>
      
    )}
  </section>
  );
};

export default React.memo(Resume);
