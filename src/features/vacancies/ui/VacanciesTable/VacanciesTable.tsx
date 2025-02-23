import {FC} from 'react';
import {useVacancyContext} from '@app/providers/vacancy/useVacancyContext';
import styles from './VacanciesTable.module.css';
import UnauthorizedMessage from '@ui/UnauthorizedMessage/UnauthorizedMessage';
import {TABLE_VACANCIES} from "@features/vacancies/config/vacansiesConfig";
import useFeedbackByVacancyId from "@features/feedback/hooks/useFeedbackByVacancyId";
import useTableHandlers from "@features/vacancies/hooks/useTableHandlers";
import Tooltip from "@ui/Tooltip/Tooltip";
import VacancyRow from "@features/vacancies/ui/VacancyRow/VacancyRow";
import {LOCALES} from "@config/localesConfig";
import ErrorAlert from "@ui/ErrorAlert/ErrorAlert";
import VacancyHeader from "@features/vacancies/ui/VacancyHeader/VacancyHeader";

const VacanciesTable: FC = () => {
    const {vacancies, loading, error: vacancyError, deleteVacancy} = useVacancyContext();
    const {getFeedbackByVacancyId, error: feedbackError} = useFeedbackByVacancyId();

    const {
        sortedData,
        handleSort,
        getSortArrow,
        tooltipState,
        handleMouseEnter,
        handleMouseLeave,
        error: sortError,
    } = useTableHandlers(vacancies);

    if (loading) return <div>{LOCALES.LOADING}</div>;
    if (vacancies.length === 0) return <div>{LOCALES.WELCOME_MESSAGE}</div>;
    if (vacancyError) return <UnauthorizedMessage/>;

    return (
        <div className={styles.vacanciesTable}>
            <h1>{TABLE_VACANCIES.tableTitle}</h1>
            <Tooltip text={tooltipState.text} position={tooltipState.position}/>
            {feedbackError && <ErrorAlert message={LOCALES.FEEDBACK_ERROR}/>}
            {sortError && <ErrorAlert message={LOCALES.SORT_ERROR}/>}

            <table>
                <VacancyHeader handleSort={handleSort} getSortArrow={getSortArrow}/>
                <tbody>
                {sortedData.map(vacancy => (
                    <VacancyRow
                        key={vacancy.id}
                        vacancy={vacancy}
                        feedback={getFeedbackByVacancyId(vacancy.id)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onDelete={deleteVacancy}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VacanciesTable;
