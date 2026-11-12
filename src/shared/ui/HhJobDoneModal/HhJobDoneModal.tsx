import styles from './HhJobDoneModal.module.css';
import type { HhJobDoneModalProps } from './HhJobDoneModal.props';
import { doneModalBody, doneModalTitle } from './endReasonCopy';

const HhJobDoneModal = ({
    found,
    foundListed,
    applyablePage1,
    alreadyInDb,
    success,
    skipped,
    failed = 0,
    pages,
    endReason,
    onClose,
}: HhJobDoneModalProps) => {
    const title = doneModalTitle(endReason);
    const body = doneModalBody(endReason);
    const listed = foundListed ?? found;

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
                        {title}
                    </h2>
                    <button type="button" className={styles.close} aria-label="Закрыть" onClick={onClose}>
                        ×
                    </button>
                </div>
                <p className={styles.body}>{body}</p>
                <ul className={styles.stats}>
                    {typeof listed === 'number' && listed > 0 ? (
                        <li>
                            Найдено в выдаче: <strong>{listed}</strong>
                        </li>
                    ) : null}
                    {typeof applyablePage1 === 'number' ? (
                        <li>
                            К отклику на стр.1: <strong>{applyablePage1}</strong>
                        </li>
                    ) : null}
                    {typeof alreadyInDb === 'number' && alreadyInDb > 0 ? (
                        <li>
                            Уже в базе (skip): <strong>{alreadyInDb}</strong>
                        </li>
                    ) : null}
                    <li>
                        Успешно откликнулись: <strong>{success}</strong>
                    </li>
                    <li>
                        Пропущено: <strong>{skipped}</strong>
                    </li>
                    {failed > 0 ? (
                        <li>
                            Ошибки отклика: <strong>{failed}</strong>
                        </li>
                    ) : null}
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
