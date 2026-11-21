import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    error: Error | null;
};

/**
 * Catches render errors in the React tree. User-facing copy only — no raw stack dump.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        // Dev console only — never surface internals in the UI.
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error('ErrorBoundary', error, info.componentStack);
        }
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
            <div role="alert" tabIndex={-1} style={{ padding: '1.5rem', maxWidth: 480 }}>
                <h2>Что-то пошло не так</h2>
                <p>Обновите страницу или попробуйте снова. Если ошибка повторяется — перезайдите в аккаунт.</p>
                <button type="button" onClick={this.reset} autoFocus>
                    Попробовать снова
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
