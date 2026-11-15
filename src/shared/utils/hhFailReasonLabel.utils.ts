const LABELS: Record<string, string> = {
    no_success_marker: 'Нет маркера успеха после отправки',
    form_invalid: 'Форма отклика не принята',
    apply_control_missing: 'Кнопка отклика не найдена',
    no_submit_control: 'Нет кнопки отправки',
    captcha: 'Капча во время отклика',
    captcha_still: 'Капча не снялась',
    exception: 'Внутренняя ошибка воркера',
};

export function labelHhFailReason(reason: string): string {
    return LABELS[reason] || reason;
}

export function formatFailReasonRows(
    failReasons?: Record<string, number> | null,
): Array<{ reason: string; count: number; label: string }> {
    if (!failReasons) return [];
    return Object.entries(failReasons)
        .filter(([, n]) => n > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([reason, count]) => ({ reason, count, label: labelHhFailReason(reason) }));
}
