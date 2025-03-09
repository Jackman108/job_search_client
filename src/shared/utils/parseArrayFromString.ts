export const parseArrayFromString = (str: string): string[] => {
    try {
        return str.replace(/[{}"]/g, '').split(',').filter(Boolean);
    } catch (error) {
        console.error('Ошибка при парсинге строки в массив:', error);
        return [];
    }
};