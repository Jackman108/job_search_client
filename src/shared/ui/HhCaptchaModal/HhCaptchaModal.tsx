import { FormEvent, useState } from 'react';
import styles from './HhCaptchaModal.module.css';
import type { HhCaptchaModalProps } from './HhCaptchaModal.props';

const HhCaptchaModal = ({ captchaSrc, busy, error, onSubmit, onDismiss }: HhCaptchaModalProps) => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const trimmed = answer.trim();
        if (!trimmed || busy) return;
        await onSubmit(trimmed);
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
                {captchaSrc ? (
                    <img className={styles.image} src={captchaSrc} alt="CAPTCHA" />
                ) : (
                    <p className={styles.waiting}>Ожидаем картинку Magritte…</p>
                )}
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
