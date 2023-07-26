import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 ">{children}</div>
    </section>
  );
}
