import AnalyticsScripts from '../components/AnalyticsScripts'
import ComplianceFooter from '../components/ComplianceFooter'
import './globals.css'

export const metadata = {
  title: {
    default: 'Credit Vivo',
    template: '%s | Credit Vivo',
  },
  description: 'Credit Vivo helps consumers upload credit reports, review possible errors, track disputes, and follow next steps in a secure portal experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ComplianceFooter />
        <AnalyticsScripts />
      </body>
    </html>
  )
}
