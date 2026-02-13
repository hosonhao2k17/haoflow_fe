import { Toaster } from "sonner";
import "./globals.css";
import "nprogress/nprogress.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
        <Toaster position="top-right" richColors/>
      </body>
    </html>
  );
}
