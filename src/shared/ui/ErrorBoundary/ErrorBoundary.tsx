import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    error: Error | null;
};

/**
 * Обёртка для перехвата ошибок в React-дереве (без внешней зависимости).
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    private reset = () => {
        this.setState({ error: null });
    };

    render() {
        const { error } = this.state;
        const { children, fallback } = this.props;
        if (!error) return children;
        if (fallback) return <>{fallback}</>;
        return (
            <div>
                <h2>Что-то пошло не так.</h2>
                <pre>{error.message}</pre>
                <button type="button" onClick={this.reset}>
                    Попробовать снова
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
