import React, { FC } from 'react';
import styles from './Graph.module.css';
import { Vacancy } from '../../Interfaces/InterfaceVacancy.types';

// Helper functions
const calculateVacanciesByDate = (vacancies: Vacancy[]) => {
  return vacancies.reduce<Record<string, number>>((acc, vacancy) => {
    const date = vacancy.response_date_date;
    if (date) {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});
};

const calculatePercentages = (statuses: string[]) => {
  const trueCount = statuses.filter(status => status === "true").length;
  const falseCount = statuses.filter(status => status === "false").length;
  const totalCount = trueCount + falseCount;

  return {
    percentageTrue: totalCount ? trueCount / totalCount : 0,
    percentageFalse: totalCount ? falseCount / totalCount : 0,
  };
};

const GradientDefs: FC<{ percentageTrue: number; percentageFalse: number }> = ({ percentageTrue, percentageFalse }) => (
  <defs>
    <linearGradient id="gradientTrue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#1E90FF', stopOpacity: 1 }} />
      <stop offset={`${percentageTrue * 100}%`} style={{ stopColor: '#1E90FF', stopOpacity: 1 }} />
      <stop offset={`${percentageTrue * 100}%`} style={{ stopColor: '#FF6347', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#FF6347', stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="gradientFalse" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#FF6347', stopOpacity: 1 }} />
      <stop offset={`${percentageFalse * 100}%`} style={{ stopColor: '#FF6347', stopOpacity: 1 }} />
      <stop offset={`${percentageFalse * 100}%`} style={{ stopColor: '#1E90FF', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#1E90FF', stopOpacity: 1 }} />
    </linearGradient>
  </defs>
);

const Bar: FC<{ x: number; barHeight: number; width: number; height: number; color: string }> = ({ x, barHeight, width, height, color }) => (
  <g>
    <rect
      x={x}
      y={height}
      width={width - 10}
      height={0}
      className={styles.bar}
      style={{ fill: color }}
    >
      <animate attributeName="height" from="0" to={barHeight} dur="1s" fill="freeze" />
      <animate attributeName="y" from={height} to={height - barHeight} dur="1s" fill="freeze" />
      </rect>
  </g>
);

const Axis: FC<{ width: number; height: number; padding: number }> = ({ width, height, padding }) => (
  <>
    <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className={styles.axisLine} />
    <line x1={padding} y1={padding} x2={padding} y2={height - padding} className={styles.axisLine} />
  </>
);
interface GraphProps {
    sortedVacancies: Vacancy[];
  }

const Graph: FC<GraphProps> = ({ sortedVacancies }) => {
  const width = 600;
  const height = 400;
  const padding = 50;
  const legendHeight = 40;
  const totalHeight = height + legendHeight + 30;

  const vacanciesByDate = calculateVacanciesByDate(sortedVacancies);
  const dates = Object.keys(vacanciesByDate);
  const counts = Object.values(vacanciesByDate);
  const statuses = sortedVacancies.map(vacancy => vacancy.vacancy_status);

  const maxCount = Math.max(...counts);
  const barWidth = (width - 2 * padding) / dates.length;

  const { percentageTrue, percentageFalse } = calculatePercentages(statuses);

  return (
    <svg width={width} height={totalHeight} className={styles.graphContainer}>
      <GradientDefs percentageTrue={percentageTrue} percentageFalse={percentageFalse} />

      {counts.map((count, index) => {
        const x = padding + index * barWidth;
        const barHeight = (count / maxCount) * (height - 2 * padding);
        const status = statuses[index];
        const color = status === 'true' ? `url(#gradientTrue)` : `url(#gradientFalse)`;

        return (
          <g key={index}>
            <Bar
              x={x}
              barHeight={barHeight}
              width={barWidth}
              height={height - padding}
              color={color}
            />
            <text
              x={x + (barWidth - 10) / 2}
              y={height - padding - barHeight - 10}
              className={styles.label}
            >
              {count}
            </text>
            <text
              x={x + (barWidth - 10) / 2}
              y={height - padding + 20}
              className={styles.dateLabel}
            >
              {dates[index]}
            </text>
          </g>
        );
      })}

      <Axis width={width} height={height} padding={padding} />

      <text x={width / 2} y={height - 10} className={styles.label}>
        Даты
      </text>
      <text
        transform={`translate(${padding - 30}, ${height / 2}) rotate(-90)`}
        className={styles.label}
      >
        Количество
      </text>

      <g transform={`translate(0, ${height})`}>
        <rect x={padding} y={10} width={20} height={10} fill="#1E90FF" />
        <text x={padding + 30} y={20} className={styles.legendLabel}>
          Успешно ({(percentageTrue * 100).toFixed(1)}%)
        </text>
        <rect x={padding + 200} y={10} width={20} height={10} fill="#FF6347" />
        <text x={padding + 230} y={20} className={styles.legendLabel}>
          Неуспешно ({(percentageFalse * 100).toFixed(1)}%)
        </text>
      </g>
    </svg>
  );
};

export default Graph;
