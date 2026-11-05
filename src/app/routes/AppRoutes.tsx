import {Route, Routes} from 'react-router-dom';
import {routes} from "@app/routes/pathConfig";
import {Suspense} from "react";
import {LOCALES} from '@config';

export const AppRoutes = () => (
    <Suspense fallback={<div>{LOCALES.LOADING}</div>}>
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    </Suspense>
);