import 'app/globals.css'
import  'bootstrap/dist/css/bootstrap.css' 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '../shared/componentes/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fala Cidadão',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar/> {children}
      </body>  
    </html>
  )
}