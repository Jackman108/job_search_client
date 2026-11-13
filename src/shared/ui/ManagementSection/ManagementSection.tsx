import { FC, useEffect, useState } from 'react';
import { Button } from '@ui';
import styles from '@shared/ui/ManagementSection/ManagementSection.module.css';
import { ManagementSectionProps } from '@type';
import useManagementControlState from '@shared/hooks/forms/useManagementControlState';
import ProfileEmptyState from './ProfileEmptyState';

const actionErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return 'Не удалось выполнить действие. Попробуйте ещё раз.';
};

const ManagementSection: FC<ManagementSectionProps> = ({
    title,
    selectedId,
    setSelectedId,
    items,
    onStartCreate,
    onSave,
    onDelete,
    disabled = false,
    emptyTitle,
    emptyDescription = 'Пока нет сохранённых профилей. Создайте новый — поля будут пустыми, затем сохраните.',
    createCtaLabel = 'Создать',
    selectPlaceholder = 'Выберите...',
    draftHint = 'Заполните поля ниже и нажмите «Сохранить».',
    newLabel = 'Новое',
    saveLabel = 'Сохранить',
    editLabel = 'Редактировать',
    deleteLabel = 'Удалить',
    isEditing,
    onEditingChange,
    canCommit = false,
    isDirty = false,
}) => {
    const [drafting, setDrafting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const busy = disabled || saving;
    const { canNew, canSave, canEdit, canDelete } = useManagementControlState({
        busy,
        selectedId,
        isEditing,
        canCommit,
    });

    useEffect(() => {
        if (items.length > 0 || selectedId != null) {
            setDrafting(false);
        }
    }, [items.length, selectedId]);

    const handleStartCreate = () => {
        setActionError(null);
        setDrafting(true);
        onEditingChange(true);
        onStartCreate();
    };

    const handleSelect = (value: string) => {
        setActionError(null);
        const nextId = value ? Number(value) : null;
        setSelectedId(nextId);
        onEditingChange(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setActionError(null);
        try {
            await onSave();
            onEditingChange(false);
        } catch (error) {
            console.error('Failed to save profile', error);
            setActionError(actionErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        setActionError(null);
        try {
            await onDelete();
            onEditingChange(false);
        } catch (error) {
            console.error('Failed to delete profile', error);
            setActionError(actionErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    if (items.length === 0 && !drafting) {
        return (
            <ProfileEmptyState
                title={emptyTitle || title}
                description={emptyDescription}
                ctaLabel={createCtaLabel}
                onCreate={handleStartCreate}
                disabled={disabled}
            />
        );
    }

    return (
        <div className={styles.managementContainer}>
            <h3>{title}</h3>
            {items.length > 0 ? (
                <select
                    value={selectedId ?? ''}
                    onChange={(e) => handleSelect(e.target.value)}
                    disabled={busy}
                    aria-disabled={busy}
                >
                    <option value="">{selectPlaceholder}</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label || `Профиль #${item.id}`}
                        </option>
                    ))}
                </select>
            ) : (
                <p className={styles.draftHint}>{draftHint}</p>
            )}
            <div className={styles.actions}>
                {items.length > 0 && (
                    <Button
                        type="button"
                        className={styles.actionButton}
                        onClick={handleStartCreate}
                        disabled={!canNew}
                        variant="primary"
                        title={newLabel}
                    >
                        {newLabel}
                    </Button>
                )}
                {isEditing ? (
                    <Button
                        type="button"
                        className={styles.actionButton}
                        onClick={handleSave}
                        disabled={!canSave}
                        variant="primary"
                        title={isDirty ? `${saveLabel} (есть изменения)` : saveLabel}
                        aria-label={saveLabel}
                        data-dirty={isDirty || undefined}
                    >
                        {isDirty ? `${saveLabel}*` : saveLabel}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => {
                            setActionError(null);
                            onEditingChange(true);
                        }}
                        disabled={!canEdit}
                        variant="secondary"
                        title={editLabel}
                        aria-label={editLabel}
                    >
                        {editLabel}
                    </Button>
                )}
                <Button
                    type="button"
                    className={styles.actionButton}
                    onClick={handleDelete}
                    disabled={!canDelete}
                    variant="danger"
                    title={deleteLabel}
                >
                    {deleteLabel}
                </Button>
            </div>
            {actionError ? (
                <p className={styles.actionError} role="alert">
                    {actionError}
                </p>
            ) : null}
        </div>
    );
};

export default ManagementSection;
