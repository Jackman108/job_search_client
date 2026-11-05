import React from 'react';

interface LoadingOrErrorProps {
    loading: boolean;
    error: any;
    t: (key: string) => string;
    className?: string;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({loading, error, t, className = '',}) => {
    if (loading) return <p className={className}>{t('common.loading')}</p>;
    if (error) return <p className={className}>{t('common.error')}: {error.message}</p>;
    return null;
};

export default LoadingOrError;