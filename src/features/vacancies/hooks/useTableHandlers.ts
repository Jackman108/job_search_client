import {MouseEvent, useCallback} from 'react';
import {useSortedData} from '@hooks/useSortedData';
import useTooltip from "@hooks/useTooltip";
import {Vacancy} from "@features/vacancies/types/Vacancies.types";
import {LOCALES} from "@config/localesConfig";

const useTableHandlers = (initialData: Vacancy[]) => {
    const {sortedData, handleSort, getSortArrow, error: sortError} = useSortedData(initialData || []);
    const {tooltipState, showTooltip, hideTooltip} = useTooltip();

    const handleMouseEnter = useCallback((e: MouseEvent<HTMLElement>, feedbackText: string | null) => {
        try {
            if (feedbackText) {
                showTooltip(feedbackText, {x: e.clientX, y: e.clientY});
            }
        } catch (error) {
            console.error(LOCALES.TOOLTIP_ERROR, error);
        }
    }, [showTooltip]);

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