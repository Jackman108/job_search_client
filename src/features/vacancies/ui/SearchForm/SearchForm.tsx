import {FC} from 'react';
import styles from './SearchForm.module.css';
import Button from '@ui/Button/Button';
import RenderInput from '@ui/RenderInput/RenderInput';
import RenderSelect from '@ui/RenderSelect/RenderSelect';
import RenderTextarea from '@ui/RenderTextarea/RenderTextarea';
import {
    FORM_CONFIG,
    FORM_LABELS,
    FORM_PARAMS,
    FORM_TEXTS,
    FormLabelKeys,
    FormParamKeys,
} from '../../config/searchConfig';
import useSearchFormLogic from '../../hooks/useSearchFormLogic';
import ManagementSection from "@ui/ManagementSection/ManagementSection";
import FormContainer from "@ui/FormContainer/FormContainer";
import {PanelProps} from "@shared/types/Component.types";
import {FORM_BUTTONS} from "@config/defaultConfig";

const SearchForm: FC<PanelProps> = ({onClose}) => {
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
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
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
                items={searchAuths?.map(auth => ({id: auth.id || 0, label: auth.email})) || []}
                onCreate={handleCreateAuth}
                onUpdate={handleUpdateAuth}
                onDelete={handleDeleteAuth}
                disabled={isLoading}
            />

            <ManagementSection
                title="Управление Опциями"
                selectedId={selectedFieldId}
                setSelectedId={setSelectedFieldId}
                items={searchFields?.map(field => ({id: field.id || 0, label: field.position})) || []}
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

export default SearchForm;