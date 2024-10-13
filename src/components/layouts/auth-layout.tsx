import { Box } from "@mui/material"
import { ReactNode } from "react"

type AuthLayoutProps = {
    children:ReactNode
}

export default function AuthLayout({children}:AuthLayoutProps){
    return  <Box
    sx={{
      p: 4,
      m: 4,
      backgroundColor: "background.container",
      borderRadius: "1rem",
    }}
  >
    {children}
  </Box>
}