// src/utils/errorHandler.ts
export const handleAuthError = (err: any): string => {
    if (err.response && err.response.data && err.response.data.message) {
        // Если сервер вернул сообщение об ошибке, используем его
        return err.response.data.message;
    }
    // Если сообщение об ошибке отсутствует, возвращаем общее сообщение
    return 'Произошла ошибка при выполнении запроса';
};

export const getErrorValidate = (emailError?: string, passwordError?: string) => {
    if (emailError) return emailError;
    if (passwordError) return passwordError;
    return 'Некорректные данные';
};
