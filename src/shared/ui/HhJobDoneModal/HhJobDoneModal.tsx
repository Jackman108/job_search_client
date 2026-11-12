import styles from './HhJobDoneModal.module.css';
import type { HhJobDoneModalProps } from './HhJobDoneModal.props';

const HhJobDoneModal = ({ success, skipped, pages, onClose }: HhJobDoneModalProps) => {
    return (
        <div className={styles.backdrop} role="presentation" onClick={onClose}>
            <div
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby="hh-job-done-title"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 id="hh-job-done-title" className={styles.title}>
                        Поиск вакансий окончен
                    </h2>
                    <button type="button" className={styles.close} aria-label="Закрыть" onClick={onClose}>
                        ×
                    </button>
                </div>
                <p className={styles.body}>Скрипт прошёл выдачу до последней доступной страницы.</p>
                <ul className={styles.stats}>
                    <li>
                        Успешно откликнулись: <strong>{success}</strong>
                    </li>
                    <li>
                        Пропущено: <strong>{skipped}</strong>
                    </li>
                </ul>
                {typeof pages === 'number' && pages > 0 ? <p className={styles.hint}>Страниц SERP: {pages}</p> : null}
                <button type="button" className={styles.ok} onClick={onClose}>
                    Понятно
                </button>
            </div>
        </div>
    );
};

export default HhJobDoneModal;
