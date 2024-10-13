
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import {cookies} from 'next/headers'

import "@/styles/globals.css";
import MainLayout from "@/components/layouts/main-layout";
import AuthLayout from "@/components/layouts/auth-layout";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const accessToken = cookies().get('access_token');

export const metadata: Metadata = {
  title: "Layout",
  description: "SMM Yorum Uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`} data-toolpad-color-scheme>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {accessToken ? <MainLayout>{children}</MainLayout> : <AuthLayout>{children}</AuthLayout>}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
