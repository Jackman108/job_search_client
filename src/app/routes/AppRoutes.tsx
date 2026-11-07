import { Route, Routes } from 'react-router-dom';
import { routes } from '@app/routes/pathConfig';
import { Suspense } from 'react';
import { LOCALES } from '@config';
import RequireAccess from '@app/routes/RequireAccess';

export const AppRoutes = () => (
    <Suspense fallback={<div>{LOCALES.LOADING}</div>}>
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<RequireAccess access={route.access}>{route.element}</RequireAccess>}
                />
            ))}
        </Routes>
    </Suspense>
);
