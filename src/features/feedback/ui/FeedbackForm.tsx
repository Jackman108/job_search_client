import React, {FC} from "react";
import {PanelProps} from "@shared/types/Component.types";
import styles from "../../vacancies/ui/SearchForm/SearchForm.module.css";
import Button from "@ui/Button/Button";
import RenderInput from "@ui/RenderInput/RenderInput";
import {FORM_CONFIG} from "../../vacancies/config/searchConfig";
import ManagementSection from "@ui/ManagementSection/ManagementSection";
import FormContainer from "@ui/FormContainer/FormContainer";
import useFeedbackLogic from "../hooks/useFeedbackLogic";
import {FORM_BUTTONS} from "@config/defaultConfig";

const FeedbackForm: FC<PanelProps> = ({onClose}) => {
    const {
        token,
        isLoading,
        errors,
        formValues,
        searchAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleInputChange,
        onSubmit,
        onStop,
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
                items={searchAuths?.map(auth => ({id: auth.id || 0, label: auth.email})) || []}
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
                        onClick={onStop}
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
