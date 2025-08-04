import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        {children}
      </body>
    </html>
  );
}
