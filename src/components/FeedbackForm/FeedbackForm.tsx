// src/components/FeedbackForm/FeedbackForm.tsx
import React, {FC} from "react";
import {FormProps} from "../../Interfaces/InterfaceComponent.types";
import {useAuth} from "../../context/useAuthContext";
import useFeedbackHandlers from "../../hooks/useFeedbackHandlers";
import styles from "../VacancyForm/SearchForm.module.css";
import UnauthorizedMessage from "../../UI/UnauthorizedMessage/UnauthorizedMessage";
import Button from "../../UI/Button/Button";
import RenderInput from "../../UI/RenderInput/RenderInput";
import {FORM_BUTTONS, FORM_TEXTS} from "../../config/searchConfig";

const FeedbackForm: FC<FormProps> = ({onClose}) => {
    const {token, isLoading} = useAuth();

    const {
        email,
        password,
        errors,
        feedbackHandler,
        feedbackStopHandler,
        handleEmailChange,
        handlePasswordChange,
    } = useFeedbackHandlers();

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

            <form className={styles.formContainer} onSubmit={feedbackHandler}>
                <div className={styles.inputsContainer}>
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
                        onClick={feedbackStopHandler}
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

export default FeedbackForm;
