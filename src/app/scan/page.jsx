import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScanClient from '../../components/ScanClient';

export const metadata = {
  title: 'Start Free Scan | Credit Vivo',
  description: 'Upload a credit report and preview Credit Vivo AI findings.',
};

export default function ScanPage() {
  return (
    <main>
      <Header />
      <ScanClient />
      <Footer />
    </main>
  );
}
