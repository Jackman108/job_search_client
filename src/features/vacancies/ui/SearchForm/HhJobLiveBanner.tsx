import styles from './HhJobLiveBanner.module.css';
import type { HhLiveApplySummary } from '@type';
import { resolveHhJobStage } from '@shared/utils/hhJobStage.utils';

interface HhJobLiveBannerProps {
    status?: string;
    lastEvent?: string | null;
    awaitingCaptcha?: boolean;
    summary?: HhLiveApplySummary | null;
}

const HhJobLiveBanner = ({ status, lastEvent, awaitingCaptcha, summary }: HhJobLiveBannerProps) => {
    const stage = resolveHhJobStage({ status, lastEvent, awaitingCaptcha });
    const listed = summary?.foundListed ?? summary?.found;
    const applyable = summary?.applyablePage1;
    const already = summary?.alreadyInDb;

    return (
        <div className={styles.banner} role="status" aria-live="polite">
            <div className={styles.stage}>
                Шаг: <strong>{stage.label}</strong>
            </div>
            {typeof already === 'number' || typeof applyable === 'number' || typeof listed === 'number' ? (
                <ul className={styles.stats}>
                    {typeof listed === 'number' ? (
                        <li>
                            В выдаче: <strong>{listed}</strong>
                        </li>
                    ) : null}
                    {typeof applyable === 'number' ? (
                        <li>
                            Новых к отклику: <strong>{applyable}</strong>
                        </li>
                    ) : null}
                    {typeof already === 'number' && already > 0 ? (
                        <li>
                            Уже в базе: <strong>{already}</strong>
                        </li>
                    ) : null}
                    {typeof summary?.success === 'number' && (summary.success > 0 || summary.failed > 0) ? (
                        <li>
                            Ок / ошибки: <strong>{summary.success}</strong> / <strong>{summary.failed}</strong>
                        </li>
                    ) : null}
                </ul>
            ) : (
                <p className={styles.hint}>{lastEvent || 'Ждём события воркера…'}</p>
            )}
            {typeof applyable === 'number' && applyable === 0 && typeof already === 'number' && already > 0 ? (
                <p className={styles.warn}>
                    Новых карточек нет — все id уже в базе. Откликов не будет, пока не появятся свежие вакансии.
                </p>
            ) : null}
        </div>
    );
};

export default HhJobLiveBanner;
