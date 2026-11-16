import { MouseEvent, useCallback, useMemo } from 'react';
import { useSortedData, useTooltip } from '@hooks';
import { LOCALES } from '@config';
import { Vacancy } from '@entities/vacancy';
import { feedbackStatusRank } from '@entities/feedback';
import type { SortDirection } from '@type';

const feedbackStatusComparator = (a: Vacancy, b: Vacancy, direction: SortDirection): number => {
    const cmp = feedbackStatusRank(a.feedback_status) - feedbackStatusRank(b.feedback_status);
    if (cmp !== 0) return direction === 'ascending' ? cmp : -cmp;
    const aTime = Date.parse(a.response_date || '') || 0;
    const bTime = Date.parse(b.response_date || '') || 0;
    const byDate = bTime - aTime;
    return direction === 'ascending' ? byDate : -byDate;
};

const useTableHandlers = (initialData: Vacancy[]) => {
    const sortOptions = useMemo(
        () => ({
            initialKey: 'feedback_status' as const,
            initialDirection: 'ascending' as const,
            comparators: { feedback_status: feedbackStatusComparator },
        }),
        [],
    );
    const { sortedData, handleSort, getSortArrow, error: sortError } = useSortedData(initialData || [], sortOptions);
    const { tooltipState, showTooltip, hideTooltip } = useTooltip();

    const handleMouseEnter = useCallback(
        (e: MouseEvent<HTMLElement>, feedbackText: string | null) => {
            try {
                if (feedbackText) {
                    showTooltip(feedbackText, { x: e.clientX, y: e.clientY });
                }
            } catch (error) {
                console.error(LOCALES.HIDE_TOOLTIP_ERROR, error);
            }
        },
        [showTooltip],
    );

    const handleMouseLeave = useCallback(() => {
        try {
            hideTooltip();
        } catch (error) {
            console.error(LOCALES.HIDE_TOOLTIP_ERROR, error);
        }
    }, [hideTooltip]);

    return {
        sortedData,
        handleSort,
        getSortArrow,
        tooltipState,
        handleMouseEnter,
        handleMouseLeave,
        error: sortError,
    };
};

export default useTableHandlers;
