import { ReactNode } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import theme from '@/common/constants/theme'

type AuthLayoutProps = {
   children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
   return (
      <ThemeProvider theme={theme} defaultMode="dark">
         <Box
            sx={{
               p: 4,
               m: 4,
               borderRadius: '1rem',
               backgroundColor: 'Background.container'
            }}
         >
            {children}
         </Box>
      </ThemeProvider>
   )
}
