// src/components/FeedbackForm/FeedbackForm.tsx
import React, {FC} from "react";
import {FormProps} from "../../Interfaces/InterfaceComponent.types";
import styles from "../SearchForm/SearchForm.module.css";
import Button from "../../UI/Button/Button";
import RenderInput from "../../UI/RenderInput/RenderInput";
import {FORM_BUTTONS, FORM_CONFIG} from "../../config/searchConfig";
import ManagementSection from "../SearchForm/ManagementSection";
import FormContainer from "../SearchForm/FormContainer";
import useFeedbackLogic from "../../hooks/submitForms/feedbackForm/useFeedbackLogic";

const FeedbackForm: FC<FormProps> = ({onClose}) => {
    const {
        token,
        isLoading,
        errors,
        formValues,
        vacancyAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleInputChange,
        onSubmit,
        feedbackStop,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    } = useFeedbackLogic();

    return (
        <FormContainer token={token} onClose={onClose}>
            <ManagementSection
                title="Управление Аккаунтами"
                selectedId={selectedAuthId}
                setSelectedId={setSelectedAuthId}
                items={vacancyAuths?.map(auth => ({id: auth.id || 0, label: auth.email})) || []}
                onCreate={handleCreateAuth}
                onUpdate={handleUpdateAuth}
                onDelete={handleDeleteAuth}
                disabled={isLoading}
            />
            <form className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.inputsContainer}>
                    {Object.entries(FORM_CONFIG.fields)
                        .filter(([key]) => key === 'email' || key === 'password')
                        .map(([key, fieldConfig]) => (
                            <RenderInput
                                key={key}
                                label={fieldConfig.label}
                                name={key}
                                value={formValues[key as keyof typeof formValues]}
                                onChange={handleInputChange(key as keyof typeof formValues)}
                                error={errors[key as keyof typeof errors]}
                                isLoading={isLoading}
                                type={fieldConfig.type}
                                placeholder={fieldConfig.placeholder}
                                required={fieldConfig.required}
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
                        onClick={feedbackStop}
                        disabled={!isLoading}
                        variant="danger"
                    >
                        {FORM_BUTTONS.stopButton}
                    </Button>
                </div>
            </form>
        </FormContainer>
    );
};

export default FeedbackForm;
