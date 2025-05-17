export const parseArrayFromString = (str: string): string[] => {
    try {
        return str.replace(/[{}"]/g, '').split(',').filter(Boolean);
    } catch (error) {
        // Логируем ошибку при преобразовании строки в массив
        console.error('Error parsing string to array:', error);
        return [];
    }
};