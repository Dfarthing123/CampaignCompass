import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "Tasks",
    icon: Search,
  },
  {
    title: "Profile",
    url: "#",
    icon: Settings,
  },
]



export const metadata: Metadata = {
  title: "Campaign Compass",
  description: "React TypeScript app with header bar login and signout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body className={`${inter.variable} font-body antialiased min-h-screen flex flex-col`}>
    <AuthProvider>
      <Header />
<     div className="flex flex-grow pt-16">
        <SidebarProvider>
          
            <Sidebar className="pt-16">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Application</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a href={item.url} className="flex items-center gap-2">
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <main >{children}</main>
          
        </SidebarProvider>
      </div>
      <Toaster />
    </AuthProvider>
  </body>
</html>
  );
}
