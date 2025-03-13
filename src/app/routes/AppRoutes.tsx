import {Route, Routes} from 'react-router-dom';
import {routes} from "@app/routes/pathConfig";
import {Suspense} from "react";

export const AppRoutes = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}/>
            ))}
        </Routes>
    </Suspense>
);