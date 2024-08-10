// src/components/VacancyForm.tsx
import {FC} from 'react';
import  useFormHandlers  from '../../hooks/useFormHandlers';
import styles from './VacancyForm.module.css';

const VacancyForm: FC = (): JSX.Element => {
  const {
    email,
    password,
    position,
    message,
    vacancyUrl,
    errors,
    isLoading,
    submitHandler,
    stopHandler,
    handleVacancyUrlChange,
    handleEmailChange,
    handlePasswordChange,
    handlePositionChange,
    handleMessageChange
  } = useFormHandlers();

  return (
    <section className={styles.sectionContainer}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Сылка с фильтрами на вакансии:</label>
          <input
            className={`${styles.input} ${errors.vacancyUrl ? styles.error : ''}`}
            value={vacancyUrl}
            onChange={handleVacancyUrlChange}
            disabled={isLoading}
          />
          {errors.vacancyUrl && <p className={styles.errorText}>{errors.vacancyUrl}</p>}
        </div>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <div className={styles.formGroup}>
              <label className={styles.label}>e-mail:</label>
              <input
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Пароль:</label>
              <input
                className={styles.input}
                type="text"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Название вакансии:</label>
              <input
                className={styles.input}
                type="text"
                value={position}
                onChange={handlePositionChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Письмо:</label>
              <textarea
                className={styles.textarea}
                value={message}
                onChange={handleMessageChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Начать'}</button>
        <button className={styles.button} type="button" onClick={stopHandler} disabled={!isLoading}>Остановить</button>
      </form>
    </section>
  );
};

export default VacancyForm;