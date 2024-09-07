// src/components/VacancyForm/VacancyForm.tsx
import { FC } from 'react';
import useFormHandlers from '../../hooks/useFormHandlers';
import styles from './VacancyForm.module.css';
import { OPTIONS, FORM_TEXTS, FORM_LABELS, FORM_BUTTONS, FORM_PARAMS } from '../../config/formConfigs';
import { useAuth } from '../../context/useAuthContext';
import Button from '../../UI/Button/Button';
import RenderInput from '../../UI/RenderInput/RenderInput';
import RenderSelect from '../../UI/RenderSelect/RenderSelect';
import RenderTextarea from '../../UI/RenderTextarea/RenderTextarea';
import { VacancyFormProps } from '../../Interfaces/InterfaceComponent.types';
import Canvas from '../../UI/Canvas/Canvas';

const VacancyForm: FC<VacancyFormProps> = ({ onClose }) => {
  const { userProfile  } = useAuth();
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
  } = useFormHandlers(userProfile?.userId || '');

  let messageContent: string | null = null;
  
  if (!userProfile) {
    messageContent = 'Пожалуйста, авторизуйтесь, чтобы заполнить форму.';
  } else if (userProfile.currentStatus !== 'active') {
    messageContent = 'Пожалуйста, пополните счёт, чтобы заполнить форму.';
  }

  if (messageContent) {
    return (
      <section className={styles.sectionContainer}>
        <p className={styles.authMessage}>{messageContent}</p>
        <Button className={styles.closeButton} onClick={onClose} variant="secondary">
          {FORM_BUTTONS.closeButton}
        </Button>
      </section>
    );
  }

  return (
    <section className={styles.sectionContainer}>
      <Button className={styles.closeButton} onClick={onClose} variant="secondary">
        {FORM_BUTTONS.closeButton}
      </Button>
  
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <div className={styles.inputsContainer}>
          <RenderInput
            label={FORM_TEXTS.vacancyUrlLabel}
            name="vacancyUrl"
            value={vacancyUrl}
            onChange={handleVacancyUrlChange}
            error={errors.vacancyUrl}
            isLoading={isLoading}
          />
          <RenderInput
            label={FORM_TEXTS.emailLabel}
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            isLoading={isLoading}
            type="email"
          />
          <RenderInput
            label={FORM_TEXTS.passwordLabel}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
            isLoading={isLoading}
            type="password"
          />
          <RenderInput
            label={FORM_TEXTS.positionLabel}
            name="position"
            value={position}
            onChange={handlePositionChange}
            error={errors.position}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.textareaContainer}>
          <RenderTextarea
            label={FORM_TEXTS.messageLabel}
            name="letter"
            value={message}
            onChange={handleMessageChange}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.selectsContainer}>
          <RenderSelect
            label={FORM_LABELS.schedule}
            options={OPTIONS.schedule}
            onChange={handleSelectChange(FORM_PARAMS.schedule)}
            isLoading={isLoading}
          />
          <RenderSelect
            label={FORM_LABELS.orderBy}
            options={OPTIONS.orderBy}
            onChange={handleSelectChange(FORM_PARAMS.orderBy)}
            isLoading={isLoading}
          />
          <RenderSelect
            label={FORM_LABELS.searchField}
            options={OPTIONS.searchField}
            onChange={handleSelectChange(FORM_PARAMS.searchField)}
            isLoading={isLoading}
          />
          <RenderSelect
            label={FORM_LABELS.experience}
            options={OPTIONS.experience}
            onChange={handleSelectChange(FORM_PARAMS.experience)}
            isLoading={isLoading}
          />
          <RenderSelect
            label={FORM_LABELS.searchPeriod}
            options={OPTIONS.searchPeriod}
            onChange={handleSelectChange(FORM_PARAMS.searchPeriod)}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.button}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? FORM_BUTTONS.isLoading : FORM_BUTTONS.submitButton}
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={stopHandler}
            disabled={!isLoading}
            variant="danger"
          >
            {FORM_BUTTONS.stopButton}
          </Button>
        </div>
      </form>
      {isLoading ? <Canvas /> : ''}
      
    </section>
  );
};

export default VacancyForm;
