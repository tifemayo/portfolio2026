import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { NotFoundPage } from "./components/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { UnifeedCasePage } from "./pages/UnifeedCasePage";
import { WeLearnCasePage } from "./pages/WeLearnCasePage";

const defaultSeo = {
  title: "Tife Boluwatife — Product Lead & APM Candidate",
  description:
    "Portfolio of Olusina Boluwatife (Tife): CS First Class, Forensic Tech Analyst at Deloitte, building Unifeed and WeLearn. Open to APM & Junior PM roles.",
};

export function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="work/unifeed" element={<UnifeedCasePage />} />
            <Route path="work/welearn" element={<WeLearnCasePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export { defaultSeo };
