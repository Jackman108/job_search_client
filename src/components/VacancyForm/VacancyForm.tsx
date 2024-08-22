// src/components/VacancyForm/VacancyForm.tsx
import { ChangeEvent, FC } from 'react';
import useFormHandlers from '../../hooks/useFormHandlers';
import styles from './VacancyForm.module.css';
import { VacancyFormProps } from '../../Interfaces/Interface.types';
import { OPTIONS, FORM_TEXTS, FORM_LABELS, FORM_BUTTONS, FORM_PARAMS } from '../../config/formConfigs';

const VacancyForm: FC<VacancyFormProps> = ({ onClose, isOpen }) => {
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
    handleMessageChange,
    handleSelectChange,
  } = useFormHandlers();

  const renderInput = (label: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, type: string = 'text') => (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}:</label>
      <input
        className={`${styles.input} ${errors[value] ? styles.error : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      {errors[value] && <p className={styles.errorText}>{errors[value]}</p>}
    </div>
  );

  const renderSelect = (
    label: string,
    options: { value: string; label: string }[],
    param: keyof typeof OPTIONS) => (

    <div className={styles.formGroup}>
      <label className={styles.label}>{label}:</label>
      <select
        className={styles.select}
        onChange={handleSelectChange(param)}
        disabled={isLoading}
        name={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
  const submitButton =  (
    <button
      className={styles.button}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? FORM_BUTTONS.isLoading : FORM_BUTTONS.submitButton}
    </button>
  );

  const stopButton = (
    <button
      className={styles.button}
      type="button"
      onClick={stopHandler}
      disabled={!isLoading}
    >
      {FORM_BUTTONS.stopButton}
    </button>
  );
  return (
    <div className={styles.formContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        {FORM_BUTTONS.closeButton}
      </button>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        {renderInput(FORM_TEXTS.vacancyUrlLabel, vacancyUrl, handleVacancyUrlChange)}
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            {renderInput(FORM_TEXTS.emailLabel, email, handleEmailChange)}
            {renderInput(FORM_TEXTS.passwordLabel, password, handlePasswordChange)}
            {renderInput(FORM_TEXTS.positionLabel, position, handlePositionChange)}
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{FORM_TEXTS.messageLabel}:</label>
              <textarea
                className={styles.textarea}
                value={message}
                onChange={handleMessageChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        {renderSelect(FORM_LABELS.schedule, OPTIONS.schedule, FORM_PARAMS.schedule)}
        {renderSelect(FORM_LABELS.orderBy, OPTIONS.orderBy, FORM_PARAMS.orderBy)}
        {renderSelect(FORM_LABELS.searchField, OPTIONS.searchField, FORM_PARAMS.searchField)}
        {renderSelect(FORM_LABELS.experience, OPTIONS.experience, FORM_PARAMS.experience)}
        {renderSelect(FORM_LABELS.searchPeriod, OPTIONS.searchPeriod, FORM_PARAMS.searchPeriod)}
        {submitButton}
        {stopButton}
      </form>
    </div>
  );
};

export default VacancyForm;
