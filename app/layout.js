export const metadata = {
  title: 'ONEIROX — Nöro-Rüya Platformu',
  description: 'Rüyalarını 6 medeniyetten analiz et',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
