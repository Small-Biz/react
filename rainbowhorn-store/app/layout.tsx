import Footer from '@/components/footer'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import Navbar from '@/components/nav-bar'

const inter = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rainbowhorn',
  description: 'Rainbowhorn store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider/>
        <ToastProvider/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
