import Title from "@/components/common/typography/Title"
import { notFound } from "next/navigation"
import { Copy, RefreshCw } from "lucide-react"
import { getAccount, getMatchDetails } from "@/lib/riot"
import { getProfileData } from "@/lib/profile"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import H2 from "@/components/common/typography/H2"
import Typography from "@/components/common/typography/Typography"
import { calcWr } from "@/lib/stat"
import RankedCard from "@/components/features/ranked-card"

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
    <div className="flex flex-col items-start gap-8">
      {/* Profile info */}
      <div className="flex flex-row flex-wrap items-start justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              className="rounded-2xl border-4 border-primary/50"
              src={profileResponse.profile.profileIconUrl}
              width={150}
              height={150}
              alt={`${gameName} icon`}
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-xl bg-background px-4">
              <Typography bold>
                {profileResponse.profile.summonerProfileData.summonerLevel}
              </Typography>
            </div>
          </div>
        </div>
        {/* Player title */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Title>{gameName}</Title>
            <div className="flex flex-row items-center gap-1">
              <Title light>#{tagLine}</Title>
              <Copy className="text-muted-foreground" size={14} />
            </div>
          </div>
          <Button>
            {/* <RefreshCw className="animate-spin" /> */}
            <RefreshCw />
            Update
          </Button>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Ranked stats */}
        <div>
          <div className="flex flex-col-reverse gap-4">
            {profileResponse.profile.rankedProfileData.map((rank) => (
              <RankedCard key={rank.queueType} rankedData={rank} />
            ))}
          </div>
        </div>
        {/* Match history */}
        <div>
          <Typography>Match history</Typography>
        </div>
      </div>
    </div>
  )
}
