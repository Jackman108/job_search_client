import { FC, useCallback, useEffect, useState } from 'react';
import { useDataApi } from '@api';
import type { HhJobStatusResponse } from '@type';
import styles from './JobHistoryList.module.css';

type JobHistoryListProps = {
    enabled: boolean;
};

const JobHistoryList: FC<JobHistoryListProps> = ({ enabled }) => {
    const { request } = useDataApi();
    const [jobs, setJobs] = useState<HhJobStatusResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!enabled) return;
        try {
            const rows = await request<HhJobStatusResponse[]>('get', '/jobs?limit=12');
            setJobs(Array.isArray(rows) ? rows : []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить историю');
        }
    }, [enabled, request]);

    useEffect(() => {
        void load();
    }, [load]);

    if (!enabled) return null;

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <span className={styles.title}>История прогонов</span>
                <button type="button" className={styles.refresh} onClick={() => void load()}>
                    ↻
                </button>
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
            {jobs.length === 0 && !error ? <p className={styles.empty}>Пока пусто</p> : null}
            <ul className={styles.list}>
                {jobs.map((job) => {
                    const s = job.summary;
                    const totals =
                        s != null
                            ? `ok ${s.success}/skip ${s.skipped}/fail ${s.failed}${s.found ? ` · найд. ${s.found}` : ''}`
                            : job.lastEvent || '—';
                    return (
                        <li key={job.id} className={styles.item}>
                            <span className={styles.kind}>
                                {job.kind === 'sendFeedback' ? 'отклик' : 'рефреш'} · {job.status}
                            </span>
                            <span className={styles.meta}>{totals}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default JobHistoryList;
