/** Lower = higher in default Results table (invites first). */
const STATUS_RANK: Record<string, number> = {
    Приглашение: 0,
    Собеседование: 0,
    Отказ: 1,
    'Резюме просмотрено': 2,
    'Не рассмотрен': 3,
};

export function feedbackStatusRank(status: string | undefined | null): number {
    if (!status) return 99;
    if (status in STATUS_RANK) return STATUS_RANK[status];
    const lower = status.toLowerCase();
    if (/приглаш|приглас|собеседован|интервью/.test(lower)) return 0;
    if (/отказ/.test(lower)) return 1;
    if (/просмотр/.test(lower)) return 2;
    if (/не\s*рассмотрен/.test(lower)) return 3;
    return 50;
}

export function compareFeedbackByStatusThenDate(
    a: { response_status?: string; feedback_date?: string },
    b: { response_status?: string; feedback_date?: string },
): number {
    const byStatus = feedbackStatusRank(a.response_status) - feedbackStatusRank(b.response_status);
    if (byStatus !== 0) return byStatus;
    const aTime = Date.parse(a.feedback_date || '') || 0;
    const bTime = Date.parse(b.feedback_date || '') || 0;
    return bTime - aTime;
}
