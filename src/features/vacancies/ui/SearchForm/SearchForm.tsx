import { FC } from 'react';
import styles from './SearchForm.module.css';
import formLayout from '@shared/styles/FormLayout.module.css';
import { PanelProps } from '@type';
import useSearchFormLogic from '../../hooks/useSearchFormLogic';
import { Button, FormContainer, ManagementSection, RenderInput, RenderSelect, RenderTextarea } from '@ui';
import { useTranslation } from 'react-i18next';
import { FORM_CONFIG, FORM_LABELS, FORM_PARAMS, FORM_TEXTS, FormLabelKeys, FormParamKeys } from '@entities/search';

const SearchForm: FC<PanelProps> = ({ onClose }) => {
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
        searchFields,
        selectedFieldId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        onStop,
        handleStartCreateProfile,
        handleSaveProfile,
        handleDeleteProfile,
    } = useSearchFormLogic();

    return (
        <FormContainer token={token} onClose={onClose}>
            <ManagementSection
                title={t('search:profile.title')}
                emptyTitle={t('search:profile.emptyTitle')}
                emptyDescription={t('search:profile.emptyDescription')}
                createCtaLabel={t('search:profile.createCta')}
                selectPlaceholder={t('search:profile.selectPlaceholder')}
                draftHint={t('search:profile.draftHint')}
                newLabel={t('search:profile.new')}
                saveLabel={t('search:profile.save')}
                editLabel={t('search:profile.edit')}
                deleteLabel={t('search:profile.delete')}
                selectedId={selectedFieldId}
                setSelectedId={setSelectedFieldId}
                items={(searchFields ?? []).flatMap((field) =>
                    field.id != null
                        ? [
                              {
                                  id: field.id,
                                  label: field.position || t('search:profile.profileLabel', { id: field.id }),
                              },
                          ]
                        : [],
                )}
                onStartCreate={handleStartCreateProfile}
                onSave={handleSaveProfile}
                onDelete={handleDeleteProfile}
                isEditing={isEditing}
                onEditingChange={setIsEditing}
                canCommit={canCommit}
                disabled={isLoading}
            />

            <form className={formLayout.formContainer} onSubmit={onSubmit}>
                <div className={formLayout.inputsContainer}>
                    {Object.entries(FORM_CONFIG.fields).map(([key, fieldConfig]) => (
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
                <div className={styles.textareaContainer}>
                    <RenderTextarea
                        label={FORM_TEXTS.messageLabel}
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange('message')}
                        isLoading={isLoading}
                        disabled={fieldsLocked}
                    />
                </div>
                <div className={styles.selectsContainer}>
                    {Object.entries(FORM_CONFIG.options).map(([key, options]) => (
                        <RenderSelect
                            key={key}
                            label={FORM_LABELS[key as FormLabelKeys]}
                            name={FORM_LABELS[key as FormLabelKeys]}
                            options={options}
                            value={formValues[key as keyof typeof formValues]}
                            onChange={handleSelectChange(FORM_PARAMS[key as FormParamKeys])}
                            isLoading={isLoading}
                            disabled={fieldsLocked}
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

export default SearchForm;
