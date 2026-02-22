import { Toaster } from "sonner";
import "./globals.css";
import "nprogress/nprogress.css"
import Providers from "./providers";
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
