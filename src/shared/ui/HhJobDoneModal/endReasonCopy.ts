import type { HhApplyEndReason } from '@type';

const TITLE: Record<HhApplyEndReason, string> = {
    last_page: 'Поиск вакансий окончен',
    page_cap: 'Достигнут лимит страниц',
    stopped: 'Поиск остановлен',
    aborted: 'Поиск прерван',
};

const BODY: Record<HhApplyEndReason, string> = {
    last_page: 'Скрипт прошёл выдачу до последней доступной страницы.',
    page_cap: 'Остановка по лимиту HH_TOTAL_PAGES — дальше SERP не листался.',
    stopped: 'Остановка вручную (Stop). Часть вакансий могла остаться без отклика.',
    aborted: 'Прогон оборвался с ошибкой. Ниже — частичные итоги, если успели накопиться.',
};

export function doneModalTitle(endReason?: HhApplyEndReason): string {
    return TITLE[endReason ?? 'last_page'];
}

export function doneModalBody(endReason?: HhApplyEndReason): string {
    return BODY[endReason ?? 'last_page'];
}
