// src/components/VacancyForm.tsx
import {FC} from 'react';
import VacancyHandlers from '../../hooks/VacancyHandlers';
import styles from './VacancyForm.module.css';

const VacancyForm: FC = (
  ): JSX.Element => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    position,
    setPosition,
    message,
    setMessage,
    vacancyUrl,
    setVacancyUrl,
    errors,
    handleSubmit,
    handleStop
  } = VacancyHandlers();
  return (
    <section className={styles.sectionContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Сылка с фильтрами на вакансии:</label>
          <input
            className={`${styles.input} ${errors.vacancyUrl ? styles.error : ''}`}
            value={vacancyUrl}
            onChange={(e) => setVacancyUrl(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Пароль:</label>
              <input
                className={styles.input}
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Название вакансии:</label>
              <input
                className={styles.input}
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Письмо:</label>
              <textarea
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className={styles.button} type="submit">Начать</button>
        <button className={styles.button} type="button" onClick={handleStop}>Остановить</button>
      </form>
    </section>
  );
};

export default VacancyForm;