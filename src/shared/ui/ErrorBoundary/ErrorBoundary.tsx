import React, { ReactNode } from 'react';
import { ErrorBoundary as REBoundary, FallbackProps } from 'react-error-boundary';

/**
 * Обёртка для перехвата ошибок в React-дереве.
 * Использует библиотеку react-error-boundary.
 */
type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

/**
 * Компонент отображения уведомления об ошибке.
 */
const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
    <div>
        <h2>Что-то пошло не так.</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Попробовать снова</button>
    </div>
);

/**
 * Функциональный компонент для перехвата ошибок.
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => (
    <REBoundary FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}>
        {children}
    </REBoundary>
);

export default ErrorBoundary; 