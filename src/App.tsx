import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from '@/lib/i18n-context';
import { AuthProvider } from '@/lib/auth';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ColorMatcherPage } from '@/pages/ColorMatcherPage';
import { PatternGeneratorPage } from '@/pages/PatternGeneratorPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { PatternLibraryPage } from '@/pages/PatternLibraryPage';
import { PatternDetailPage } from '@/pages/PatternDetailPage';
import { CrochetPlannerPage } from '@/pages/CrochetPlannerPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { BlogPage } from '@/pages/BlogPage';
import { PricingPage } from '@/pages/PricingPage';
import { LoginPage } from '@/pages/LoginPage';
import { AccountPage } from '@/pages/AccountPage';

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
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
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
