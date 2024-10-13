import NAVIGATION from "@/common/constants/navigation";
import theme from "@/common/constants/theme";
import { DashboardLayout } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type MainLayoutProps = {
    children:ReactNode
}

export default function MainLayout({children}:MainLayoutProps){
    return <AppProvider navigation={NAVIGATION} theme={theme}>
    <DashboardLayout>
      <Box
        sx={{
          p: 4,
          m: 4,
          backgroundColor: "background.container",
          borderRadius: "1rem",
        }}
      >
        {children}
      </Box>
    </DashboardLayout>
  </AppProvider>
}