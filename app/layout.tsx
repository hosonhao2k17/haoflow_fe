import { Toaster } from "sonner";
import "./globals.css";
import "nprogress/nprogress.css"
import { useUserStore } from "@/store/user.store";
import Providers from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "./react-query.providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className="">
          <ReactQueryProvider>
            <Providers>
              {children}
            </Providers>
          </ReactQueryProvider>
        <Toaster position="top-right" richColors/>
      </body>
    </html>
  );
}
