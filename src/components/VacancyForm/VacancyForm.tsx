// src/components/VacancyForm/VacancyForm.tsx
import {FC} from 'react';
import useVacancyHandlers from '../../hooks/useVacancyHandlers';
import styles from './VacancyForm.module.css';
import {
    FORM_BUTTONS,
    FORM_LABELS,
    FORM_PARAMS,
    FORM_TEXTS,
    FormLabelKeys,
    FormParamKeys,
    OPTIONS,
} from '../../config/formConfigs';
import {useAuth} from '../../context/useAuthContext';
import Button from '../../UI/Button/Button';
import RenderInput from '../../UI/RenderInput/RenderInput';
import RenderSelect from '../../UI/RenderSelect/RenderSelect';
import RenderTextarea from '../../UI/RenderTextarea/RenderTextarea';
import {FormProps} from '../../Interfaces/InterfaceComponent.types';
import UnauthorizedMessage from '../../UI/UnauthorizedMessage/UnauthorizedMessage';

const VacancyForm: FC<FormProps> = ({onClose}) => {
    const {token, isLoading} = useAuth();
    const {
        email,
        password,
        position,
        message,
        vacancyUrl,
        errors,
        submitHandler,
        stopHandler,
        handleVacancyUrlChange,
        handleEmailChange,
        handlePasswordChange,
        handlePositionChange,
        handleMessageChange,
        handleSelectChange,
    } = useVacancyHandlers();

    if (!token) {
        return (
            <section className={styles.sectionContainer}>
                <UnauthorizedMessage/>
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
                    {Object.entries(OPTIONS).map(([key, options]) => (
                        <RenderSelect
                            key={key}
                            label={FORM_LABELS[key as FormLabelKeys]}
                            options={options}
                            onChange={handleSelectChange(FORM_PARAMS[key as FormParamKeys])}
                            isLoading={isLoading}
                        />
                    ))}
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

        </section>
    );
};

export default VacancyForm;
