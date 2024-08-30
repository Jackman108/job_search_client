import { Vacancy } from '../Interfaces/InterfaceVacancy.types';
import { formatDate } from './dateUtils';

export const formatAndSortVacancies = (vacancies: Vacancy[]): Vacancy[] => {
  return vacancies.map(vacancy => ({
    ...vacancy,
    response_date_time: formatDate(vacancy.response_date).time,
    response_date_date: formatDate(vacancy.response_date).date,
  })).sort((a, b) => new Date(b.response_date).getTime() - new Date(a.response_date).getTime());
};
  