"use client"
import { LogoHorizontal, Button, Logomark } from "@dallah/design-system";
import { Home, Calendar, Inbox, Settings, Mail, Search, User, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Profile")


  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className="flex items-center justify-between ">
      <LogoHorizontal className="w-36 [&_path]:fill-slate-blue-100" />

      <div className="hidden md:flex items-center gap-2  rounded-full p-1 ">
        {["Home", "Projects", "Search", "Invoices", "Profile"].map((tab) => (
          <Button
            key={tab}
            size='lg'
            variant={activeTab === tab ? "default" : "ghost"}
            className={`!rounded-full flex items-center gap-2 !px-4   ${activeTab === tab ? "bg-slate-blue-100 text-white" : "bg-background text-slate-blue-100"}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "Home" && <Home className="h-6 w-6" />}
            {tab === "Projects" && <Calendar className="h-6 w-6" />}
            {tab === "Search" && <Search className="h-6 w-6" />}
            {tab === "Invoices" && <Inbox className="h-6 w-6" />}
            {tab === "Profile" && <User2 className="h-6 w-6" />}
            <span className="text-text-md font-sora">{tab}</span>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mail className="h-5 w-5" />
        </Button>

        <div className="h-9 w-9 rounded-full bg-amber-100 overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/122938074?v=4"
            alt="Profile"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}