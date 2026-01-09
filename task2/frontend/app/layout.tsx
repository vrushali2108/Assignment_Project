import './globals.css'

export const metadata = {
  title: 'AI Feedback System',
  description: 'Submit reviews and view analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
