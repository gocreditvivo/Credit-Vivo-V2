import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import WhyCreditVivo from './pages/WhyCreditVivo';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Learning from './pages/Learning';
import JoinFree from './pages/JoinFree';
import Reviews from './pages/Reviews';
import Compliance from './pages/Compliance';
import Dashboard from './pages/Dashboard';
import FreeScan from './pages/FreeScan';
import Findings from './pages/Findings';
import AdminReview from './pages/AdminReview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/why" element={<WhyCreditVivo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/join" element={<JoinFree />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/compliance" element={<Compliance />} />
        </Route>

        {/* Member pages */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<FreeScan />} />
          <Route path="/findings" element={<Findings />} />
          <Route path="/admin-review" element={<AdminReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
