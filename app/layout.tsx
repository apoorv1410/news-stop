import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 60 // revalidate all feed data every minute

export const metadata: Metadata = {
  title: "News Stop",
  description: "Your one stop for news around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <div className="mt-16">
              {children}
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}