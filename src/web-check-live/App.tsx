import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

import Home from 'web-check-live/views/Home.tsx';
import Results from 'web-check-live/views/Results.tsx';
import About from 'web-check-live/views/About.tsx';
import NotFound from 'web-check-live/views/NotFound.tsx';

import ErrorBoundary from 'web-check-live/components/boundaries/PageError.tsx';
import GlobalStyles from './styles/globals.tsx';

const Layout = () => {
  return (
  <>
    <GlobalStyles />
    <Outlet />
  </>
  );
}

// 子路由组件，用于处理 URL 参数
const ResultsWrapper = () => {
  const location = useLocation();
  const urlPath = location.pathname.split('/').pop() || '';
  // 将 URL 参数传递给 Results 组件
  return <Results />;
};

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/check" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path=":urlToScan/*" element={<ResultsWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
