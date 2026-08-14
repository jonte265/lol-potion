import Title from "@/components/common/typography/Title"
import { notFound } from "next/navigation"
import { Copy } from "lucide-react"
import { getAccount, getMatchDetails } from "@/lib/riot"
import { getProfileData } from "@/lib/profile"

export default async function ProfilePage({ params }: any) {
  const { gameName, tagLine } = await params

  const response = await getAccount(gameName, tagLine)

  if (response.status === 404) {
    notFound()
  }

  if (!response.ok) {
    throw new Error("Riot API request failed")
  }

  const responseAccount = await response.json()

  console.log("ye", responseAccount)

  const profileResponse = await getProfileData(responseAccount.puuid)

  console.log("all profile details", profileResponse)

  return (
    <div className="flex items-center gap-2">
      {/* Player title */}
      <div className="flex flex-row gap-2">
        <Title>{gameName}</Title>
        <div className="flex flex-row items-center gap-1">
          <Title light>#{tagLine}</Title>
          <Copy className="text-muted-foreground" size={14} />
        </div>
      </div>
    </div>
  )
}
