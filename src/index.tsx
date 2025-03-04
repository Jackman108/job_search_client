import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import './index.css';
import App from '@app/ui/App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const root:Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools initialIsOpen buttonPosition={"top-right"}/>
        </QueryClientProvider>
    </React.StrictMode>
);

reportWebVitals();
