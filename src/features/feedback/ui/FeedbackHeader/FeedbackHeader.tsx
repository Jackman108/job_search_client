import {FC} from 'react';
import {FEEDBACK_HEADER} from "@entities/feedback";
import {FeedbackHeaderProps} from "@features/feedback/props/Feedback.props";
import styles from "./FeedbackHeader.module.css";

const FeedbackHeader: FC<FeedbackHeaderProps> = ({handleSort, getSortArrow}) => (
    <thead className={styles.FeedbackHeader}>
    <tr>
        <th onClick={() => handleSort('id')}>
            {FEEDBACK_HEADER.feedbackId} {getSortArrow('id')}
        </th>
        <th onClick={() => handleSort('vacancy_id')}>
            {FEEDBACK_HEADER.vacancyId} {getSortArrow('vacancy_id')}
        </th>
        <th onClick={() => handleSort('feedback_text')}>
            {FEEDBACK_HEADER.feedbackText} {getSortArrow('feedback_text')}
        </th>
        <th onClick={() => handleSort('feedback_date')}>
            {FEEDBACK_HEADER.feedbackDate} {getSortArrow('feedback_date')}
        </th>
        <th onClick={() => handleSort('response_status')}>
            {FEEDBACK_HEADER.feedbackStatus} {getSortArrow('response_status')}
        </th>
        <th>{FEEDBACK_HEADER.deletedButton}</th>
    </tr>
    </thead>
);

export default FeedbackHeader;