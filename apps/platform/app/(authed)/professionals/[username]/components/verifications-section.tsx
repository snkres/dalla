import { Mail } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { useRouter } from 'next/navigation'

export function VerificationsSection({
  isEmailVerified,
  isPublicView = false,
  isOwner = false,
}: {
  isEmailVerified: boolean
  isPublicView?: boolean
  isOwner?: boolean
}) {
  const router = useRouter()
  const verifications = [
    // { title: 'Phone number', icon: <Phone className="h-4 w-4" /> },
    { title: 'Email address', icon: <Mail className="h-4 w-4" /> },
    // { title: 'ID verification', icon: <ShieldCheck className="h-4 w-4" /> },
  ]

  const handleVerifyEmail = () => {
    router.push('/verify')
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <h2 className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ShieldCheck className="h-4 w-4 text-[#63B7B7]" />
          Verifications
        </h2>
      </div>

      <div className="p-3">
        {verifications.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between px-1 py-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#63B7B7]/10 text-[#63B7B7]">
                {item.icon}
              </div>
              <span className="text-sm">{item.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={cn(
                  'border-0 !bg-[#63B7B7]/10 text-xs !text-[#63B7B7]',
                  item.title === 'Email address' && isEmailVerified
                    ? '!bg-[#63B7B7]/10 !text-[#63B7B7]'
                    : '!bg-gray-100 !text-gray-700',
                )}
              >
                {item.title === 'Email address' && isEmailVerified
                  ? 'Verified'
                  : 'Unverified'}
              </Badge>

              {item.title === 'Email address' &&
                !isEmailVerified &&
                isOwner &&
                !isPublicView && (
                  <Button
                    onClick={handleVerifyEmail}
                    size="sm"
                    variant="outline"
                    className="!h-6 border-[#63B7B7]/30 px-2 !text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
                  >
                    Verify
                  </Button>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
