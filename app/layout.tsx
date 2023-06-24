import "./globals.css";
import { Inter } from "next/font/google";
import "@/src/assets/fontawesome/css/all.css";
import LoadingOverlay from "@/src/contexts/LoadingContext";
import UserConnection from "@/src/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserConnection>
          <LoadingOverlay>{children}</LoadingOverlay>
        </UserConnection>
      </body>
    </html>
  );
}
