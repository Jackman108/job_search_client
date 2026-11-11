import React, { FC } from 'react';
import { PanelProps } from '@type';
import formLayout from '@shared/styles/FormLayout.module.css';
import { Button, FormContainer, ManagementSection, RenderInput } from '@ui';
import useFeedbackLogic from '../../hooks/useFeedbackLogic';
import { useTranslation } from 'react-i18next';
import { FORM_CONFIG } from '@entities/search';

const FeedbackForm: FC<PanelProps> = ({ onClose }) => {
    const { t } = useTranslation(['auth', 'search']);

    const {
        token,
        isLoading,
        fieldsLocked,
        isEditing,
        setIsEditing,
        canCommit,
        errors,
        formValues,
        searchAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleInputChange,
        onSubmit,
        onStop,
        handleStartCreateAuth,
        handleSaveAuth,
        handleDeleteAuth,
    } = useFeedbackLogic();

    return (
        <FormContainer token={token} onClose={onClose}>
            <ManagementSection
                title={t('search:hhAuth.title')}
                emptyTitle={t('search:hhAuth.emptyTitle')}
                emptyDescription={t('search:hhAuth.emptyDescription')}
                createCtaLabel={t('search:hhAuth.createCta')}
                selectPlaceholder={t('search:hhAuth.selectPlaceholder')}
                newLabel={t('search:profile.new')}
                saveLabel={t('search:profile.save')}
                editLabel={t('search:profile.edit')}
                deleteLabel={t('search:profile.delete')}
                selectedId={selectedAuthId}
                setSelectedId={setSelectedAuthId}
                items={(searchAuths ?? []).flatMap((auth) =>
                    auth.id != null ? [{ id: auth.id, label: auth.email }] : [],
                )}
                onStartCreate={handleStartCreateAuth}
                onSave={handleSaveAuth}
                onDelete={handleDeleteAuth}
                isEditing={isEditing}
                onEditingChange={setIsEditing}
                canCommit={canCommit}
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
                                disabled={fieldsLocked}
                                type={fieldConfig.type}
                                placeholder={fieldConfig.placeholder}
                                required={fieldConfig.required}
                            />
                        ))}
                </div>

                <div className={formLayout.buttonsContainer}>
                    <Button className={formLayout.button} type="submit" disabled={isLoading}>
                        {isLoading ? t('auth:form.isLoading') : t('auth:button.start')}
                    </Button>
                    <Button
                        className={formLayout.button}
                        type="button"
                        onClick={onStop}
                        disabled={!isLoading}
                        variant="danger"
                    >
                        {t('auth:button.stop')}
                    </Button>
                </div>
            </form>
        </FormContainer>
    );
};

export default FeedbackForm;
