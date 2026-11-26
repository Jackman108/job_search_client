import { useCallback, useMemo } from 'react';
import { useFetchByType } from '@api';
import { formatAndSortData } from '@utils';
import { useRefreshWhileHhJob } from '@hooks';
import type { HhJobKind } from '@type';
import { feedbackConfig } from '../config/feedbackConfig';
import { Feedback } from '../types/Feedback.types';
import { formatFeedbackDate } from '../utils/formatFeedbackDate';
import { buildFeedbackVacancyIndex, findFeedbackForVacancy } from '../utils/matchFeedbackToVacancy';

const FEEDBACK_JOB_KINDS: readonly HhJobKind[] = ['getFeedback'];

type VacancyFeedbackKey = {
    id: number;
    title_vacancy?: string;
    title_company?: string;
};

/** Entity-level lookup so vacancies UI does not import features/feedback (A6). */
const useFeedbackByVacancyId = () => {
    const { fetchedData, error: feedbackError, loadData } = useFetchByType(feedbackConfig);
    useRefreshWhileHhJob(loadData, FEEDBACK_JOB_KINDS);

    const feedbacks: Feedback[] = useMemo(
        () =>
            fetchedData.feedback ? formatAndSortData(fetchedData.feedback, formatFeedbackDate, 'feedback_date') : [],
        [fetchedData.feedback],
    );

    const index = useMemo(() => buildFeedbackVacancyIndex(feedbacks), [feedbacks]);

    const getFeedbackForVacancy = useCallback(
        (vacancy: VacancyFeedbackKey): Feedback | undefined => {
            if (feedbackError || !feedbacks.length) {
                return undefined;
            }
            return findFeedbackForVacancy(index, vacancy);
        },
        [feedbacks, feedbackError, index],
    );

    /** @deprecated Prefer getFeedbackForVacancy — id-only misses list-sync rows with vacancy_id=0. */
    const getFeedbackByVacancyId = useCallback(
        (vacancyId: number): Feedback | undefined => getFeedbackForVacancy({ id: vacancyId }),
        [getFeedbackForVacancy],
    );

    return {
        getFeedbackForVacancy,
        getFeedbackByVacancyId,
        error: feedbackError,
    };
};

export default useFeedbackByVacancyId;
