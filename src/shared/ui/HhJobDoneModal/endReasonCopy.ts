import type { HhApplyEndReason } from '@type';

const TITLE: Record<HhApplyEndReason, string> = {
    last_page: 'Поиск вакансий окончен',
    page_cap: 'Достигнут лимит страниц',
    apply_cap: 'Достигнут лимит откликов',
    dry_run: 'Просмотр выдачи без откликов',
    stopped: 'Поиск остановлен',
    aborted: 'Поиск прерван',
};

const BODY: Record<HhApplyEndReason, string> = {
    last_page: 'Скрипт прошёл выдачу до последней доступной страницы.',
    page_cap: 'Остановка по лимиту HH_TOTAL_PAGES — дальше SERP не листался.',
    apply_cap: 'Остановка по лимиту откликов (applyCap / HH_APPLY_CAP).',
    dry_run: 'Режим dry-run: вакансии найдены и показаны, клики отклика не выполнялись.',
    stopped: 'Остановка вручную (Stop). Часть вакансий могла остаться без отклика.',
    aborted: 'Прогон оборвался с ошибкой. Ниже — частичные итоги, если успели накопиться.',
};

export function doneModalTitle(endReason?: HhApplyEndReason): string {
    return TITLE[endReason ?? 'last_page'];
}

export function doneModalBody(endReason?: HhApplyEndReason): string {
    return BODY[endReason ?? 'last_page'];
}
