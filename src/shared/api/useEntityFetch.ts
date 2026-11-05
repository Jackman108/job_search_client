import { QueryConfigProps } from '@type';
import { useFetchByType } from '@api';

/**
 * Универсальный хук для получения и изменения сущностей по конфигу
 * @param config - Конфигурация с ключом и endpoint'ом
 * @returns объект с данными, статусом загрузки, ошибкой и методами CRUD
 */
export default function useEntityFetch<T>(
    config: QueryConfigProps['config'],
    keyOverride?: string
) {
    const key = keyOverride || Object.keys(config)[0];
    const { fetchedData = {}, loading, error, saveItem, deleteItem, loadData } =
        useFetchByType(config);
    const data = (fetchedData[key] as T[]) || [];
    return { data, loading, error, saveItem, deleteItem, loadData };
} 