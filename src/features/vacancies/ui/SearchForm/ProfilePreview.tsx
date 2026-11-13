import { FC, useMemo } from 'react';
import styles from './ProfilePreview.module.css';

type ProfilePreviewProps = {
    email: string;
    position: string;
    vacancyUrl: string;
};

const maskEmail = (email: string): string => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email || '—';
    const head = user.slice(0, 2);
    return `${head}***@${domain}`;
};

const hostOf = (url: string): string => {
    try {
        return new URL(url).host || '—';
    } catch {
        return '—';
    }
};

/** One-line profile summary for view mode (fields hidden in accordions). */
const ProfilePreview: FC<ProfilePreviewProps> = ({ email, position, vacancyUrl }) => {
    const line = useMemo(
        () => `${maskEmail(email)} · ${position || 'без названия'} · ${hostOf(vacancyUrl)}`,
        [email, position, vacancyUrl],
    );

    return (
        <p className={styles.preview} title={line}>
            {line}
        </p>
    );
};

export default ProfilePreview;
