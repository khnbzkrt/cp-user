import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { Roboto } from 'next/font/google'
import { cookies } from 'next/headers'
import AuthLayout from '@/components/layouts/auth-layout'
import MainLayout from '@/components/layouts/main-layout'
import type { Metadata } from 'next'
import '@/styles/globals.css'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Layout',
   description: 'SMM Yorum Uygulaması'
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   const accessToken = cookies().get('access_token')

   return (
      <html lang="en">
         <body className={`${roboto.className}`} data-toolpad-color-scheme>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
               {accessToken ? (
                  <MainLayout>{children}</MainLayout>
               ) : (
                  <AuthLayout>{children}</AuthLayout>
               )}
            </AppRouterCacheProvider>
         </body>
      </html>
   )
}
