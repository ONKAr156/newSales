import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sales Portal',
  description: 'Sales Portal for sales data',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>asdasdsad</h1>
        {children}
      </body>
    </html>
  )
}
