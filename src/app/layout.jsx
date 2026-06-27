import './globals.css';

export const metadata = {
  title: 'Credit Vivo | Credit Report Review Software',
  description: 'Educational credit report review, self-directed next-step organization, and progress tracking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
