import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeProps } from '../../Interfaces/InterfaceResume.types';
import Button from '../../UI/Button/Button';
import { useProfileHandlers } from '../../hooks/useProfileHandlers';
import styles from './Resume.module.css';

const Resume: FC<ResumeProps> = () => {
  const { userProfile } = useProfileHandlers();
  const userId = userProfile?.userId
  const navigate = useNavigate();

  const handleGetClick = () => {
    navigate('/resume/');
  };
  
  return (
    <section className={styles.resumeSection}>
    {userId ?  (
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