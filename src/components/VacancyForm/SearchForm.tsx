import {FC} from 'react';
import styles from './SearchForm.module.css';

import Button from '../../UI/Button/Button';
import RenderInput from '../../UI/RenderInput/RenderInput';
import RenderSelect from '../../UI/RenderSelect/RenderSelect';
import RenderTextarea from '../../UI/RenderTextarea/RenderTextarea';
import UnauthorizedMessage from '../../UI/UnauthorizedMessage/UnauthorizedMessage';
import {
    FORM_BUTTONS,
    FORM_LABELS,
    FORM_PARAMS,
    FORM_TEXTS,
    FormLabelKeys,
    FormParamKeys,
    OPTIONS,
} from '../../config/searchConfig';
import useSearchFormLogic from '../../hooks/searchForm/useSearchFormLogic';

const SearchForm: FC<{ onClose: () => void }> = ({onClose}) => {
    const {
        token,
        isLoading,
        errors,
        formValues,
        authVacancies,
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
    } = useSearchFormLogic(onClose);


    const {email, password, position, message, vacancyUrl} = formValues;

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
            <div className={styles.managementContainer}>
                <h3>Управление Аккаунтами</h3>
                <select
                    value={selectedAuthId || ''}
                    onChange={(e) => setSelectedAuthId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Выберите Аккаунт</option>
                    {authVacancies?.map(vacancy => (
                        <option key={vacancy.id} value={vacancy.id}>
                            {vacancy.email}
                        </option>
                    ))}
                </select>
                <Button onClick={handleCreateVacancy}>
                    Создать Аккаунт
                </Button>
                <Button onClick={handleUpdateVacancy} disabled={!selectedAuthId}>
                    Обновить Аккаунт
                </Button>
                <Button onClick={handleDeleteVacancy} disabled={!selectedAuthId} variant="danger">
                    Удалить Аккаунт
                </Button>
            </div>

            <div className={styles.managementContainer}>
                <h3>Управление Опциями</h3>
                <select
                    value={selectedFieldId || ''}
                    onChange={(e) => setSelectedFieldId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Выберите Опции</option>
                    {vacancyFields?.map(field => (
                        <option key={field.id} value={field.id}>
                            {field.position}
                        </option>
                    ))}
                </select>
                <Button onClick={handleCreateField}>Создать Опции </Button>
                <Button onClick={handleUpdateField} disabled={!selectedFieldId}>
                    Обновить Опции
                </Button>
                <Button onClick={handleDeleteField} disabled={!selectedFieldId} variant="danger">
                    Удалить Опции
                </Button>
            </div>

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
                        name="message"
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


        </section>
    );
};

export default SearchForm;