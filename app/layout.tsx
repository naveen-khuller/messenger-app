import './globals.css';
import { Inter } from 'next/font/google';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger App',
  description: 'Messenger clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext >
        <ToasterContext />
        {children}</AuthContext>
        </body>
    </html>
  )
}