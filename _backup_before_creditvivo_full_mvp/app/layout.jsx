import './globals.css';

export const metadata = {
  title: 'Credit Vivo | AI Credit Improvement',
  description: 'AI-powered credit report review, dispute preparation, and progress tracking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
