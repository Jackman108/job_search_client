/** Turn raw HH/worker errors into short user guidance. */
export function humanizeHhError(raw: string | null | undefined): string {
    const text = (raw || '').trim();
    if (!text) return 'Неизвестная ошибка прогона HH.';

    const lower = text.toLowerCase();

    if (/cancelled by user|cancel/.test(lower)) {
        return 'Прогон остановлен. Можно запустить снова кнопкой «Отклик».';
    }
    if (/captcha/.test(lower) && /timeout|истёк|expired/.test(lower)) {
        return 'Время ожидания капчи истекло. Запустите снова и введите код быстрее.';
    }
    if (/timeout|navigation timeout|waiting for/.test(lower)) {
        return 'HH не ответил вовремя. Проверьте сеть и попробуйте ещё раз (при зависании входа — HH_HEADED=1).';
    }
    if (/password|парол|bad.?password|неверн/.test(lower)) {
        return 'Не удалось войти: проверьте пароль HH. Если на экране Magritte «Ошибка» — это часто временный сбой, повторите.';
    }
    if (/resume|резюме|hidden/.test(lower)) {
        return 'Резюме на HH должно быть видимым для отклика. Откройте hh.ru и проверьте видимость.';
    }
    if (/401|unauthorized|jwt|token/.test(lower)) {
        return 'Сессия Market Hunter истекла. Обновите страницу и войдите снова.';
    }
    if (/econnrefused|network|fetch failed/.test(lower)) {
        return 'Нет связи с backend. Поднимите сервисы (dev-up) и повторите.';
    }

    // Keep original as fallback but prefix so it's actionable.
    return `Сбой прогона: ${text}`;
}
