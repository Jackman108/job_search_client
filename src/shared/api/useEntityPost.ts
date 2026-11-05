import { usePostByType } from './usePostByType';
import type { ConfigItem } from '@type';

/**
 * Универсальный хук для POST-запросов по конфигу эндпоинтов
 * @param config - конфигурация endpoint'ов
 */
export function useEntityPost<TConfig extends Record<string, ConfigItem>>(config: TConfig) {
    const { saveItem, loading, error } = usePostByType(config);

    /**
     * Выполняет POST/PUT запрос по указанному типу операции
     * @param type - ключ операции из конфига
     * @param options.id - id ресурса (для PUT обновлений)
     * @param options.formData - тело запроса
     * @param options.isEditing - флаг редактирования (PUT vs POST)
     */
    const post = async <K extends keyof TConfig>(
        type: K,
        options: { id?: string; formData: any; isEditing?: boolean }
    ) => {
        return saveItem({
            type: String(type),
            id: options.id,
            formData: options.formData,
            isEditing: options.isEditing ?? false,
        });
    };

    return { post, loading, error };
} 