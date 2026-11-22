import styles from './LearningPage.module.css';

const learnUrl = (process.env.REACT_APP_LEARN_URL || '').trim();

const LearningPage = () => {
    if (!learnUrl) {
        return (
            <div className={styles.wrap} role="region" aria-label="Обучение">
                <h1 className={styles.title}>Обучение</h1>
                <p className={styles.empty}>
                    Не задан <code>REACT_APP_LEARN_URL</code>. Добавьте URL course-app (локально{' '}
                    <code>http://localhost:3040</code>) в <code>.env</code> и перезапустите клиент.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.wrap} role="region" aria-label="Обучение">
            <div className={styles.toolbar}>
                <h1 className={styles.title}>Обучение</h1>
                <a className={styles.external} href={learnUrl} target="_blank" rel="noreferrer">
                    Открыть в новой вкладке
                </a>
                <p className={styles.hint}>Курс собесов (job-hunt / course-app). Контент не копируется в клиент.</p>
            </div>
            <iframe
                className={styles.frame}
                title="Курс подготовки к собеседованиям"
                src={learnUrl}
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default LearningPage;
