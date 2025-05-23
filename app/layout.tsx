import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felicia Teja Irawan - Computer Science Undergraduate",
  description: "Personal portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">{children}</div>
        </main>
        <footer className="text-center text-gray-500 text-sm py-6 border-t bg-white">
          © {new Date().getFullYear()} Felicia Teja Irawan
        </footer>
      </body>
    </html>
  )
}

