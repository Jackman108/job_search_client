import { FC } from 'react';
import { Button } from '@ui';
import styles from './ProfileEmptyState.module.css';
import { ProfileEmptyStateProps } from './ProfileEmptyState.props';

const ProfileEmptyState: FC<ProfileEmptyStateProps> = ({
    title,
    description,
    ctaLabel = 'Создать',
    onCreate,
    disabled = false,
}) => {
    return (
        <div className={styles.emptyState} role="status">
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <Button type="button" onClick={onCreate} disabled={disabled} variant="primary">
                {ctaLabel}
            </Button>
        </div>
    );
};

export default ProfileEmptyState;
