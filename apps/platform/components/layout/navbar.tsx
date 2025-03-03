'use client'
import { LogoHorizontal, Button, Logomark } from '@dallah/design-system'
import { companyProfileAtom } from '@lib/atoms/company/profile'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { useAtom } from 'jotai'
import { Home, Calendar, Inbox, Mail, Search, User2 } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname.split('/')[1] || 'home')
  const [proProfile] = useAtom(proProfileAtom)
  const [companyProfile] = useAtom(companyProfileAtom)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className="flex items-center justify-between">
      <LogoHorizontal className="[&_path]:fill-slate-blue-100 w-36" />

      <div className="hidden items-center gap-2 rounded-full p-1 md:flex">
        {['home', 'projects', 'search', 'invoices', 'profile'].map((tab) => (
          <Button
            key={tab}
            size="lg"
            variant={activeTab === tab ? 'default' : 'ghost'}
            className={`flex items-center gap-2 !rounded-full !px-4 capitalize ${activeTab === tab ? 'bg-slate-blue-100 text-white' : 'bg-background text-slate-blue-100'}`}
            onClick={() => handleTabChange(tab)}
            asChild
          >
            <Link
              href={`/${
                tab === 'home'
                  ? ''
                  : tab === 'profile'
                    ? proProfile
                      ? `professionals/${proProfile.id}`
                      : `companies/${companyProfile?.id}`
                    : tab
              }`}
            >
              {tab === 'home' && <Home className="h-6 w-6" />}
              {tab === 'projects' && <Calendar className="h-6 w-6" />}
              {tab === 'search' && <Search className="h-6 w-6" />}
              {tab === 'invoices' && <Inbox className="h-6 w-6" />}
              {tab === 'profile' && <User2 className="h-6 w-6" />}
              <span className="text-text-md font-sora">{tab}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mail className="h-5 w-5" />
        </Button>

        <div className="h-9 w-9 overflow-hidden rounded-full bg-amber-100">
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
