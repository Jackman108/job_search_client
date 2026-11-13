import { FC } from 'react';
import styles from './SearchForm.module.css';
import formLayout from '@shared/styles/FormLayout.module.css';
import { PanelProps } from '@type';
import useSearchFormLogic from '../../hooks/useSearchFormLogic';
import { Accordion, Button, FormContainer, ManagementSection, RenderInput, RenderSelect, RenderTextarea } from '@ui';
import { useTranslation } from 'react-i18next';
import { FORM_CONFIG, FORM_LABELS, FORM_PARAMS, FORM_TEXTS, FormLabelKeys, FormParamKeys } from '@entities/search';
import { FILTER_OPTION_KEYS, LOGIN_FIELD_KEYS, VACANCY_SECTION_KEYS } from './searchFormFieldGroups';
import ProfilePreview from './ProfilePreview';
import JobHistoryList from './JobHistoryList';
import { readLastApplySnapshot } from '@shared/utils/lastApplySnapshot.utils';

const SearchForm: FC<PanelProps> = ({ onClose }) => {
    const { t } = useTranslation(['auth', 'search']);

    const {
        token,
        isLoading,
        fieldsLocked,
        isEditing,
        setIsEditing,
        canCommit,
        isDirty,
        errors,
        formValues,
        searchFields,
        selectedFieldId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        dryRun,
        setDryRun,
        applyCap,
        setApplyCap,
        applyActive,
        refreshActive,
        canStart,
        canRefresh,
        onSubmit,
        onApplyToggle,
        onRefreshToggle,
        onRepeatLast,
        handleStartCreateProfile,
        handleSaveProfile,
        handleDeleteProfile,
    } = useSearchFormLogic();

    const applyToggleDisabled = applyActive ? false : !canStart;
    const refreshToggleDisabled = refreshActive ? false : !canRefresh;
    const hasLast = Boolean(readLastApplySnapshot());

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
                isDirty={Boolean(isDirty)}
                disabled={isLoading}
            />

            {!isEditing ? (
                <ProfilePreview
                    email={formValues.email}
                    position={formValues.position}
                    vacancyUrl={formValues.vacancyUrl}
                />
            ) : null}

            <form className={formLayout.formContainer} onSubmit={onSubmit}>
                {isEditing ? (
                    <div className={styles.accordionStack}>
                        <Accordion title={t('search:accordions.login')} defaultOpen>
                            <div className={formLayout.inputsContainer}>
                                {LOGIN_FIELD_KEYS.map((key) => {
                                    const fieldConfig = FORM_CONFIG.fields[key];
                                    return (
                                        <RenderInput
                                            key={key}
                                            label={fieldConfig.label}
                                            name={key}
                                            value={formValues[key]}
                                            onChange={handleInputChange(key)}
                                            error={errors[key]}
                                            isLoading={isLoading}
                                            disabled={fieldsLocked}
                                            type={fieldConfig.type}
                                            placeholder={fieldConfig.placeholder}
                                            required={fieldConfig.required}
                                        />
                                    );
                                })}
                            </div>
                        </Accordion>

                        <Accordion title={t('search:accordions.vacancyBlock')}>
                            {VACANCY_SECTION_KEYS.map((key) => {
                                const fieldConfig = FORM_CONFIG.fields[key];
                                return (
                                    <RenderInput
                                        key={key}
                                        label={fieldConfig.label}
                                        name={key}
                                        value={formValues[key]}
                                        onChange={handleInputChange(key)}
                                        error={errors[key]}
                                        isLoading={isLoading}
                                        disabled={fieldsLocked}
                                        type={fieldConfig.type}
                                        placeholder={fieldConfig.placeholder}
                                        required={fieldConfig.required}
                                    />
                                );
                            })}
                            <RenderTextarea
                                label={FORM_TEXTS.messageLabel}
                                name="message"
                                value={formValues.message}
                                onChange={handleInputChange('message')}
                                isLoading={isLoading}
                                disabled={fieldsLocked}
                            />
                        </Accordion>

                        <Accordion title={t('search:accordions.filters')} defaultOpen>
                            <div className={styles.selectsContainer}>
                                {FILTER_OPTION_KEYS.map((key) => (
                                    <RenderSelect
                                        key={key}
                                        label={FORM_LABELS[key as FormLabelKeys]}
                                        name={FORM_LABELS[key as FormLabelKeys]}
                                        options={FORM_CONFIG.options[key]}
                                        value={formValues[key as keyof typeof formValues]}
                                        onChange={handleSelectChange(FORM_PARAMS[key as FormParamKeys])}
                                        isLoading={isLoading}
                                        disabled={fieldsLocked}
                                    />
                                ))}
                            </div>
                        </Accordion>
                    </div>
                ) : null}

                <div className={styles.optionsRow}>
                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={dryRun}
                            onChange={(e) => setDryRun(e.target.checked)}
                            disabled={isLoading || isEditing}
                        />
                        Dry-run (только SERP)
                    </label>
                    <label className={styles.cap}>
                        Лимит откликов
                        <input
                            type="number"
                            min={1}
                            className={styles.capInput}
                            value={applyCap}
                            disabled={isLoading || isEditing}
                            onChange={(e) => {
                                const v = e.target.value;
                                setApplyCap(v === '' ? '' : Math.max(1, Number(v) || 1));
                            }}
                            placeholder="∞"
                        />
                    </label>
                </div>

                <div className={styles.toggles}>
                    <Button
                        type="button"
                        className={`${styles.toggle} ${applyActive ? styles.toggleOn : ''}`}
                        variant={applyActive ? 'danger' : 'primary'}
                        disabled={applyToggleDisabled}
                        aria-pressed={applyActive}
                        title={applyActive ? t('search:toggles.applyOnHint') : t('search:toggles.applyOffHint')}
                        onClick={() => void onApplyToggle()}
                    >
                        {applyActive ? t('search:toggles.applyOn') : t('search:toggles.applyOff')}
                    </Button>
                    <Button
                        type="button"
                        className={`${styles.toggle} ${styles.refreshToggle} ${refreshActive ? styles.refreshToggleOn : ''}`}
                        variant="secondary"
                        disabled={refreshToggleDisabled}
                        aria-pressed={refreshActive}
                        title={t('search:toggles.refreshHint')}
                        onClick={() => void onRefreshToggle()}
                    >
                        {refreshActive ? t('search:toggles.refreshOn') : t('search:toggles.refreshOff')}
                    </Button>
                    <Button
                        type="button"
                        className={styles.toggle}
                        variant="secondary"
                        disabled={!hasLast || isLoading || isEditing || applyActive}
                        title={t('search:toggles.repeatHint')}
                        onClick={() => void onRepeatLast()}
                    >
                        {t('search:toggles.repeat')}
                    </Button>
                </div>
            </form>

            <JobHistoryList enabled={Boolean(token)} />
        </FormContainer>
    );
};

export default SearchForm;
