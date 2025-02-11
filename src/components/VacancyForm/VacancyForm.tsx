// src/components/VacancyForm/VacancyForm.tsx
import {FC, FormEvent} from 'react';
import styles from './VacancyForm.module.css';

import {useAuth} from '../../context/useAuthContext';
import Button from '../../UI/Button/Button';
import RenderInput from '../../UI/RenderInput/RenderInput';
import RenderSelect from '../../UI/RenderSelect/RenderSelect';
import RenderTextarea from '../../UI/RenderTextarea/RenderTextarea';
import {FormProps} from '../../Interfaces/InterfaceComponent.types';
import UnauthorizedMessage from '../../UI/UnauthorizedMessage/UnauthorizedMessage';
import useVacancyFormState from "../../hooks/vacancyForm/useVacancyFormState";
import useVacancySubmit from "../../hooks/vacancyForm/useVacancySubmit";
import {
    FORM_BUTTONS,
    FORM_LABELS,
    FORM_PARAMS,
    FORM_TEXTS,
    FormLabelKeys,
    FormParamKeys,
    OPTIONS
} from "../../config/searchConfig";

const VacancyForm: FC<FormProps> = ({onClose}) => {
    const {token, isLoading, setIsLoading} = useAuth();
    const {formValues, errors, setErrors, handleInputChange, handleSelectChange,} = useVacancyFormState();
    const {handleSubmit, handleStop} = useVacancySubmit();

    const {email, password, position, message, vacancyUrl} = formValues;

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await handleSubmit({
            ...formValues,
            token,
            setErrors,
            setIsLoading,
        });
    };

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

            <form className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.inputsContainer}>
                    <RenderInput
                        label={FORM_TEXTS.emailLabel}
                        name="email"
                        value={email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                        isLoading={isLoading}
                        type="email"
                    />
                    <RenderInput
                        label={FORM_TEXTS.passwordLabel}
                        name="password"
                        value={password}
                        onChange={handleInputChange('password')}
                        error={errors.password}
                        isLoading={isLoading}
                        type="password"
                    />
                    <RenderInput
                        label={FORM_TEXTS.vacancyUrlLabel}
                        name="vacancyUrl"
                        value={vacancyUrl}
                        onChange={handleInputChange('vacancyUrl')}
                        error={errors.vacancyUrl}
                        isLoading={isLoading}
                    />
                    <RenderInput
                        label={FORM_TEXTS.positionLabel}
                        name="position"
                        value={position}
                        onChange={handleInputChange('position')}
                        error={errors.position}
                        isLoading={isLoading}
                    />
                </div>
                <div className={styles.textareaContainer}>
                    <RenderTextarea
                        label={FORM_TEXTS.messageLabel}
                        name="letter"
                        value={message}
                        onChange={handleInputChange('message')}
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
                        onClick={handleStop}
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
