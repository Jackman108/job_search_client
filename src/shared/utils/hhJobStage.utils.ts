export type HhJobStageId = 'queued' | 'login' | 'serp' | 'apply' | 'captcha' | 'done' | 'error';

export interface HhJobStage {
    id: HhJobStageId;
    label: string;
}

/** Map worker lastEvent (+ captcha flag) to a coarse user-facing pipeline step. */
export function resolveHhJobStage(input: {
    status?: string;
    lastEvent?: string | null;
    awaitingCaptcha?: boolean;
}): HhJobStage {
    if (input.awaitingCaptcha) {
        return { id: 'captcha', label: 'Капча — нужен ответ' };
    }
    const ev = (input.lastEvent || '').toLowerCase();
    if (input.status === 'queued') {
        return { id: 'queued', label: 'В очереди' };
    }
    if (input.status === 'done') {
        return { id: 'done', label: 'Готово' };
    }
    if (input.status === 'error' || input.status === 'cancelled') {
        return { id: 'error', label: 'Остановлено' };
    }
    if (/captcha|капч/.test(ev)) {
        return { id: 'captcha', label: 'Капча — нужен ответ' };
    }
    if (/логин|login|magritte|парол|phone|authorize|авториз/.test(ev)) {
        return { id: 'login', label: 'Вход на HH' };
    }
    if (/найден|serp|поиск вакан|search|стр\./.test(ev)) {
        return { id: 'serp', label: 'Поиск / выдача' };
    }
    if (/отклик|vacancy saved|apply|успешн|пропущ|ошибк/.test(ev)) {
        return { id: 'apply', label: 'Отклики' };
    }
    if (input.status === 'running') {
        return { id: 'login', label: 'Работает…' };
    }
    return { id: 'queued', label: 'Ожидание' };
}
