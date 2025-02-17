import {FC} from 'react';
import styles from './SearchForm.module.css';

import Button from '../../UI/Button/Button';
import RenderInput from '../../UI/RenderInput/RenderInput';
import RenderSelect from '../../UI/RenderSelect/RenderSelect';
import RenderTextarea from '../../UI/RenderTextarea/RenderTextarea';
import {
    FORM_BUTTONS,
    FORM_CONFIG,
    FORM_LABELS,
    FORM_PARAMS,
    FORM_TEXTS,
    FormLabelKeys,
    FormParamKeys,
} from '../../config/searchConfig';
import useSearchFormLogic from '../../hooks/submitForms/searchForm/useSearchFormLogic';
import ManagementSection from "./ManagementSection";
import FormContainer from "./FormContainer";

const SearchForm: FC<{ onClose: () => void }> = ({onClose}) => {
    const {
        token,
        isLoading,
        errors,
        formValues,
        vacancyAuths,
        vacancyFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        handleStop,
        handleCreateVacancy,
        handleUpdateVacancy,
        handleDeleteVacancy,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    } = useSearchFormLogic();

    return (
        <FormContainer token={token} onClose={onClose}>

            <ManagementSection
                title="Управление Аккаунтами"
                selectedId={selectedAuthId}
                setSelectedId={setSelectedAuthId}
                items={vacancyAuths?.map(auth => ({id: auth.id || 0, label: auth.email})) || []}
                onCreate={handleCreateVacancy}
                onUpdate={handleUpdateVacancy}
                onDelete={handleDeleteVacancy}
                disabled={isLoading}
            />

            <ManagementSection
                title="Управление Опциями"
                selectedId={selectedFieldId}
                setSelectedId={setSelectedFieldId}
                items={vacancyFields?.map(field => ({id: field.id || 0, label: field.position})) || []}
                onCreate={handleCreateField}
                onUpdate={handleUpdateField}
                onDelete={handleDeleteField}
                disabled={isLoading}
            />

            <form className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.inputsContainer}>
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
                            options={options}
                            value={formValues[key as keyof typeof formValues]}
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
        </FormContainer>
    );
};

export default SearchForm;