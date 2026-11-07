import React, { FC } from 'react';
import { PanelProps } from '@type';
import formLayout from '@shared/styles/FormLayout.module.css';
import { Button, FormContainer, ManagementSection, RenderInput } from '@ui';
import useFeedbackLogic from '../../hooks/useFeedbackLogic';
import { useTranslation } from 'react-i18next';
import { FORM_CONFIG } from '@entities/search';

const FeedbackForm: FC<PanelProps> = ({ onClose }) => {
    const { t } = useTranslation('auth');

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
                items={searchAuths?.map((auth) => ({ id: auth.id || 0, label: auth.email })) || []}
                onCreate={handleCreateAuth}
                onUpdate={handleUpdateAuth}
                onDelete={handleDeleteAuth}
                disabled={isLoading}
            />
            <form className={formLayout.formContainer} onSubmit={onSubmit}>
                <div className={formLayout.inputsContainer}>
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

                <div className={formLayout.buttonsContainer}>
                    <Button className={formLayout.button} type="submit" disabled={isLoading}>
                        {isLoading ? t('form.isLoading') : t('button.start')}
                    </Button>
                    <Button
                        className={formLayout.button}
                        type="button"
                        onClick={onStop}
                        disabled={!isLoading}
                        variant="danger"
                    >
                        {t('button.stop')}
                    </Button>
                </div>
            </form>
        </FormContainer>
    );
};

export default FeedbackForm;
