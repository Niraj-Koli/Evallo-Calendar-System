import "vite/modulepreload-polyfill";

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = lazy(() => import("@/components/Auth/Auth"));
const Calendar = lazy(() => import("@/components/Calendar/Calendar"));
const Loader = lazy(() => import("@/components/Loader/Loader"));

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route
                        path="/calendar"
                        element={isAuthenticated ? <Calendar /> : <Auth />}
                    />
                    <Route path="*" element={<Auth />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
