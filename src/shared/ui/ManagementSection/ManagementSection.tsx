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
    onCreate,
    onUpdate,
    onDelete,
    disabled = false,
    emptyTitle,
    emptyDescription = 'Пока нет сохранённых профилей. Создайте новый — поля будут пустыми, затем сохраните.',
    createCtaLabel = 'Создать',
}) => {
    const [drafting, setDrafting] = useState(false);

    useEffect(() => {
        if (items.length > 0 || selectedId != null) {
            setDrafting(false);
        }
    }, [items.length, selectedId]);

    const handleStartCreate = () => {
        setDrafting(true);
        onStartCreate();
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
                    onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Выберите...</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label || `Профиль #${item.id}`}
                        </option>
                    ))}
                </select>
            ) : (
                <p className={styles.draftHint}>Заполните поля ниже и нажмите «Сохранить».</p>
            )}
            {items.length > 0 && (
                <Button type="button" onClick={handleStartCreate} disabled={disabled} variant="primary">
                    Новый
                </Button>
            )}
            <Button type="button" onClick={onCreate} disabled={!!selectedId || disabled} variant="primary">
                Сохранить
            </Button>
            <Button type="button" onClick={onUpdate} disabled={!selectedId || disabled} variant="primary">
                <img src="/icons/pen.svg" alt="Edit" className={styles.editIcon} />
            </Button>
            <Button type="button" onClick={onDelete} disabled={!selectedId || disabled} variant="danger">
                Удалить
            </Button>
        </div>
    );
};

export default ManagementSection;
