export const metadata = {
  title: 'ONEIROX — Nöro-Rüya Platformu',
  description: 'Rüyalarını 6 medeniyetten analiz et',
  manifest: '/manifest.json',
  themeColor: '#6C3CE0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
