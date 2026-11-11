import { FC } from 'react';
import styles from './SearchForm.module.css';
import formLayout from '@shared/styles/FormLayout.module.css';
import { PanelProps } from '@type';
import useSearchFormLogic from '../../hooks/useSearchFormLogic';
import { Button, FormContainer, ManagementSection, RenderInput, RenderSelect, RenderTextarea } from '@ui';
import { useTranslation } from 'react-i18next';
import { FORM_CONFIG, FORM_LABELS, FORM_PARAMS, FORM_TEXTS, FormLabelKeys, FormParamKeys } from '@entities/search';

const SearchForm: FC<PanelProps> = ({ onClose }) => {
    const { t } = useTranslation('auth');

    const {
        token,
        isLoading,
        errors,
        formValues,
        searchAuths,
        searchFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        onStop,
        handleStartCreateAuth,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
        handleStartCreateField,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    } = useSearchFormLogic();

    return (
        <FormContainer token={token} onClose={onClose}>
            <ManagementSection
                title="Управление Аккаунтами"
                emptyTitle="Нет аккаунтов HH"
                emptyDescription="Создайте аккаунт — email и пароль будут пустыми, затем сохраните."
                createCtaLabel="Создать аккаунт"
                selectedId={selectedAuthId}
                setSelectedId={setSelectedAuthId}
                items={(searchAuths ?? []).flatMap((auth) =>
                    auth.id != null ? [{ id: auth.id, label: auth.email }] : [],
                )}
                onStartCreate={handleStartCreateAuth}
                onCreate={handleCreateAuth}
                onUpdate={handleUpdateAuth}
                onDelete={handleDeleteAuth}
                disabled={isLoading}
            />

            <ManagementSection
                title="Управление Опциями"
                emptyTitle="Нет профилей поиска"
                emptyDescription="Создайте профиль — название и письмо будут пустыми, затем сохраните."
                createCtaLabel="Создать профиль"
                selectedId={selectedFieldId}
                setSelectedId={setSelectedFieldId}
                items={(searchFields ?? []).flatMap((field) =>
                    field.id != null ? [{ id: field.id, label: field.position || `Профиль #${field.id}` }] : [],
                )}
                onStartCreate={handleStartCreateField}
                onCreate={handleCreateField}
                onUpdate={handleUpdateField}
                onDelete={handleDeleteField}
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

export default SearchForm;
