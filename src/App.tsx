import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from '@/lib/i18n-context';
import { AuthProvider } from '@/lib/auth';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HomePage } from '@/pages/HomePage';

const ColorMatcherPage = lazy(() => import('@/pages/ColorMatcherPage').then((m) => ({ default: m.ColorMatcherPage })));
const PatternGeneratorPage = lazy(() => import('@/pages/PatternGeneratorPage').then((m) => ({ default: m.PatternGeneratorPage })));
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const PatternLibraryPage = lazy(() => import('@/pages/PatternLibraryPage').then((m) => ({ default: m.PatternLibraryPage })));
const PatternDetailPage = lazy(() => import('@/pages/PatternDetailPage').then((m) => ({ default: m.PatternDetailPage })));
const CrochetPlannerPage = lazy(() => import('@/pages/CrochetPlannerPage').then((m) => ({ default: m.CrochetPlannerPage })));
const CommunityPage = lazy(() => import('@/pages/CommunityPage').then((m) => ({ default: m.CommunityPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const PricingPage = lazy(() => import('@/pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const AccountPage = lazy(() => import('@/pages/AccountPage').then((m) => ({ default: m.AccountPage })));

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-olive" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/color-matcher" element={<ColorMatcherPage />} />
                    <Route path="/pattern-generator" element={<PatternGeneratorPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/pattern-library" element={<PatternLibraryPage />} />
                    <Route path="/pattern-library/:id" element={<PatternDetailPage />} />
                    <Route path="/crochet-planner" element={<CrochetPlannerPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<LoginPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
