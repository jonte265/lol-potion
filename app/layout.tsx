import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="flex min-h-screen flex-col gap-8 p-4">
        <ThemeProvider>
          <SiteHeader />

          <main className="flex-1">{children}</main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
