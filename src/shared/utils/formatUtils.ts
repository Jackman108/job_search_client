import {FormattedDate} from "@shared/types/Base.types";

export const formatAndSortData = <T>(data: T[], formatFn: (item: T) => T, sortKey: keyof T): T[] => {
    return data.map(formatFn).sort((a, b) => new Date(b[sortKey] as any).getTime() - new Date(a[sortKey] as any).getTime());
};


export const formatDate = (isoDateString: string): FormattedDate => {

    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
        return {time: '', date: ''};
    }
    const time = date.toISOString().slice(11, 16);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    return {time, date: formattedDate};
};
  