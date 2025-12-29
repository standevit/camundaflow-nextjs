import { auth } from "@/auth"
import { redirect } from "next/navigation"
import DashboardClient from "@/components/DashboardClient"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardClient 
      userName={session.user?.name}
      userEmail={session.user?.email}
      userImage={session.user?.image}
    />
  )
}
