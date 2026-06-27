import "./globals.css";

export const metadata = {
  title: "CreditVivo — Credit improvement you can see, prove, and track",
  description: "CreditVivo helps consumers review credit reports, organize evidence, prepare dispute support, and track bureau and furnisher responses."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
