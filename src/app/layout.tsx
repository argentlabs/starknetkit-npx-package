import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Demo dapp starknet",
  description:
    "Demo dapp for starknet using starknetjs, starknetkit and starknet-react",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          style={{ height: "100dvh", display: "flex", flexDirection: "column" }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
