import {FC} from 'react';
import styles from './Graph.module.css';
import {Vacancy} from '@entities/vacancy';

const calculateVacanciesByDate = (vacancies: Vacancy[]) => {
    return vacancies.reduce<Record<string, { count: number; success: number }>>((acc, vacancy) => {
        const date = vacancy.response_date_date || vacancy.response_date?.split(' ')[0];
        if (!date) return acc;
        if (!acc[date]) acc[date] = {count: 0, success: 0};
        acc[date].count += 1;
        if (vacancy.vacancy_status === 'true') acc[date].success += 1;
        return acc;
    }, {});
};

const calculatePercentages = (statuses: string[]) => {
    const trueCount = statuses.filter(status => status === 'true').length;
    const falseCount = statuses.filter(status => status === 'false').length;
    const totalCount = trueCount + falseCount;
    return {
        percentageTrue: totalCount ? trueCount / totalCount : 0,
        percentageFalse: totalCount ? falseCount / totalCount : 0,
    };
};

interface GraphProps {
    vacancies: Vacancy[];
}

const Graph: FC<GraphProps> = ({vacancies}) => {
    const width = 600;
    const height = 400;
    const padding = 50;
    const legendHeight = 40;
    const totalHeight = height + legendHeight + 30;

    const vacanciesByDate = calculateVacanciesByDate(vacancies);
    const dates = Object.keys(vacanciesByDate);
    if (dates.length === 0) return null;

    const counts = dates.map(d => vacanciesByDate[d].count);
    const statuses = vacancies.map(v => v.vacancy_status);
    const maxCount = Math.max(...counts, 1);
    const barWidth = (width - 2 * padding) / dates.length;
    const {percentageTrue, percentageFalse} = calculatePercentages(statuses);

    return (
        <svg width={width} height={totalHeight} className={styles.graphContainer} role="img" aria-label="Vacancies by date">
            <defs>
                <linearGradient id="gradientTrue" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#1E90FF', stopOpacity: 1}}/>
                    <stop offset="100%" style={{stopColor: '#1E90FF', stopOpacity: 1}}/>
                </linearGradient>
                <linearGradient id="gradientFalse" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#FF6347', stopOpacity: 1}}/>
                    <stop offset="100%" style={{stopColor: '#FF6347', stopOpacity: 1}}/>
                </linearGradient>
            </defs>

            {dates.map((date, index) => {
                const x = padding + index * barWidth;
                const barHeight = (counts[index] / maxCount) * (height - 2 * padding);
                const mostlySuccess = vacanciesByDate[date].success >= counts[index] / 2;
                const color = mostlySuccess ? 'url(#gradientTrue)' : 'url(#gradientFalse)';
                return (
                    <g key={date}>
                        <rect
                            x={x}
                            y={height - padding}
                            width={Math.max(barWidth - 10, 4)}
                            height={0}
                            className={styles.bar}
                            style={{fill: color}}
                        >
                            <animate attributeName="height" from="0" to={barHeight} dur="1s" fill="freeze"/>
                            <animate attributeName="y" from={height - padding} to={height - padding - barHeight} dur="1s" fill="freeze"/>
                        </rect>
                        <text x={x + (barWidth - 10) / 2} y={height - padding - barHeight - 10} className={styles.label}>
                            {counts[index]}
                        </text>
                        <text x={x + (barWidth - 10) / 2} y={height - padding + 20} className={styles.dateLabel}>
                            {date}
                        </text>
                    </g>
                );
            })}

            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className={styles.axisLine}/>
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} className={styles.axisLine}/>

            <text x={width / 2} y={height - 10} className={styles.label}>Даты</text>
            <text transform={`translate(${padding - 30}, ${height / 2}) rotate(-90)`} className={styles.label}>
                Количество
            </text>

            <g transform={`translate(0, ${height})`}>
                <rect x={padding} y={10} width={20} height={10} fill="#1E90FF"/>
                <text x={padding + 30} y={20} className={styles.legendLabel}>
                    Успешно ({(percentageTrue * 100).toFixed(1)}%)
                </text>
                <rect x={padding + 200} y={10} width={20} height={10} fill="#FF6347"/>
                <text x={padding + 230} y={20} className={styles.legendLabel}>
                    Неуспешно ({(percentageFalse * 100).toFixed(1)}%)
                </text>
            </g>
        </svg>
    );
};

export default Graph;
