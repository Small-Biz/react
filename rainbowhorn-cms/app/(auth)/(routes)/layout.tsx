import { ClerkProvider } from '@clerk/nextjs'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="flex item-center justify-center h-full">
            {children}
        </div>
    )
}
