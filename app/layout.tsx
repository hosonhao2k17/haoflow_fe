import { Toaster } from "sonner";
import "./globals.css";
import "nprogress/nprogress.css"
import { useUserStore } from "@/store/user.store";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className="">
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" richColors/>
      </body>
    </html>
  );
}
