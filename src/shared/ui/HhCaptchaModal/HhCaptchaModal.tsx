import { FormEvent, useEffect, useState } from 'react';
import styles from './HhCaptchaModal.module.css';
import type { HhCaptchaModalProps } from './HhCaptchaModal.props';

const formatElapsed = (startedAt: number): string => {
    const sec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
};

const HhCaptchaModal = ({
    captchaSrc,
    busy,
    error,
    onSubmit,
    onDismiss,
    onRefreshImage,
    waitingSince,
}: HhCaptchaModalProps) => {
    const [answer, setAnswer] = useState('');
    const [elapsed, setElapsed] = useState('0:00');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const started = waitingSince ? Date.parse(waitingSince) : Date.now();
        const tick = () => setElapsed(formatElapsed(Number.isFinite(started) ? started : Date.now()));
        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, [waitingSince, captchaSrc]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const trimmed = answer.trim();
        if (!trimmed || busy) return;
        await onSubmit(trimmed);
    };

    const handleRefresh = async () => {
        if (!onRefreshImage || busy || refreshing) return;
        setRefreshing(true);
        try {
            await onRefreshImage();
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="CAPTCHA">
            <form className={styles.panel} onSubmit={handleSubmit}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Пройдите капчу</h2>
                    {onDismiss ? (
                        <button type="button" className={styles.close} onClick={onDismiss} aria-label="Закрыть">
                            ×
                        </button>
                    ) : null}
                </header>
                <p className={styles.hint}>
                    {captchaSrc
                        ? 'Введите текст с картинки — браузер HH остаётся headless. Скрипт ждёт ответ.'
                        : 'Капча на HH. Картинка ещё подгружается — модалка не закроется, пока не ответите или не истечёт таймаут.'}
                </p>
                <p className={styles.timer} aria-live="polite">
                    Ожидание: {elapsed}
                </p>
                {captchaSrc ? (
                    <img className={styles.image} src={captchaSrc} alt="CAPTCHA" />
                ) : (
                    <p className={styles.waiting}>Ожидаем картинку Magritte…</p>
                )}
                {onRefreshImage ? (
                    <button
                        type="button"
                        className={styles.refresh}
                        onClick={() => void handleRefresh()}
                        disabled={busy || refreshing}
                    >
                        {refreshing ? 'Обновляем…' : '↻ Обновить картинку'}
                    </button>
                ) : null}
                <label className={styles.label}>
                    Текст с картинки
                    <input
                        className={styles.input}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        autoFocus
                        autoComplete="off"
                        disabled={busy}
                    />
                </label>
                {error ? <p className={styles.error}>{error}</p> : null}
                <button className={styles.submit} type="submit" disabled={busy || !answer.trim()}>
                    {busy ? 'Отправка…' : 'Отправить'}
                </button>
            </form>
        </div>
    );
};

export default HhCaptchaModal;
