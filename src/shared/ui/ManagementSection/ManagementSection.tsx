import { FC, useEffect, useState } from 'react';
import { Button } from '@ui';
import styles from '@shared/ui/ManagementSection/ManagementSection.module.css';
import { ManagementSectionProps } from '@type';
import ProfileEmptyState from './ProfileEmptyState';

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
}) => {
    const [drafting, setDrafting] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (items.length > 0 || selectedId != null) {
            setDrafting(false);
        }
    }, [items.length, selectedId]);

    const handleStartCreate = () => {
        setDrafting(true);
        onEditingChange(true);
        onStartCreate();
    };

    const handleSelect = (value: string) => {
        const nextId = value ? Number(value) : null;
        setSelectedId(nextId);
        onEditingChange(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave();
            onEditingChange(false);
        } catch (error) {
            console.error('Failed to save profile', error);
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

    const busy = disabled || saving;

    return (
        <div className={styles.managementContainer}>
            <h3>{title}</h3>
            {items.length > 0 ? (
                <select value={selectedId ?? ''} onChange={(e) => handleSelect(e.target.value)} disabled={busy}>
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
            {items.length > 0 && (
                <Button type="button" onClick={handleStartCreate} disabled={busy} variant="primary">
                    {newLabel}
                </Button>
            )}
            <Button type="button" onClick={handleSave} disabled={busy || !isEditing} variant="primary">
                {saveLabel}
            </Button>
            <Button
                type="button"
                onClick={() => onEditingChange(true)}
                disabled={busy || !selectedId || isEditing}
                variant="primary"
            >
                {editLabel}
            </Button>
            <Button type="button" onClick={onDelete} disabled={!selectedId || busy} variant="danger">
                {deleteLabel}
            </Button>
        </div>
    );
};

export default ManagementSection;
