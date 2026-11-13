import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { NotFoundPage } from "./components/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { UnifeedCasePage } from "./pages/UnifeedCasePage";
import { BeLearnCasePage } from "./pages/BeLearnCasePage";

export function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="work/unifeed" element={<UnifeedCasePage />} />
            <Route path="work/belearn" element={<BeLearnCasePage />} />
            {/* Old addresses still work */}
            <Route path="work/welearn" element={<Navigate to="/work/belearn" replace />} />
            <Route path="about" element={<Navigate to="/#about" replace />} />
            <Route path="contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
