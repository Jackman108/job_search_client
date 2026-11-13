import { FC } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { FormContainer } from '@ui';
import { PanelProps } from '@type';
import styles from './RefreshResultSlot.module.css';

/**
 * Sidebar slot «Обновить результат» — container kept for layout,
 * content intentionally empty (refresh UI retired).
 */
const RefreshResultSlot: FC<PanelProps> = ({ onClose }) => {
    const { token } = useAuth();

    return (
        <FormContainer token={token} onClose={onClose}>
            <div className={styles.slot} aria-hidden="true" data-testid="refresh-result-slot" />
        </FormContainer>
    );
};

export default RefreshResultSlot;
