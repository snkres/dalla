import { Navbar } from "@components/layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div className="min-h-screen bg-[#F3F2F1]">
      {/* Main container */}
      <div className=" mx-auto px-6 pt-3">
        {/* Top Navigation */}
        <Navbar />
        {children}
      </div>

    </div>
  );
}