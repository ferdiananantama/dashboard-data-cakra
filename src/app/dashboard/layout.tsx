import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivateRoute from "@/hooks/router-controller/Private-Route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </PrivateRoute>
  );
}
