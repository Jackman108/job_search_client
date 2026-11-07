export type SortDirection = 'ascending' | 'descending';

export interface SortConfig<T> {
    key: keyof T;
    direction: SortDirection;
}
