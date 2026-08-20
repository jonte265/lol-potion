import CopyButton from "@/components/common/copy-button"
import Title from "@/components/common/typography/Title"
import Typography from "@/components/common/typography/Typography"
import ChampionMasteryList from "@/components/features/champion-mastery-list"
import MatchCard from "@/components/features/match-card"
import RankedCard from "@/components/features/ranked-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getChampionInfo, getChampionSplashUrl } from "@/lib/ddragon"
import { getProfileData } from "@/lib/profile"
import { formatRegion } from "@/lib/region"
import { getAccount } from "@/lib/riot"
import { RefreshCw } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ProfilePage({ params }: any) {
  const { region, gameName, tagLine } = await params

  const routingRegion = formatRegion(region)

  if (!routingRegion) {
    notFound()
  }

  const responseAccount = await getAccount(routingRegion, gameName, tagLine)

  if (!responseAccount) {
    notFound()
  }

  const profileResponse = await getProfileData(region, responseAccount.puuid)

  const championMasteries = await Promise.all(
    profileResponse.masteryProfileData.map((champ) =>
      getChampionInfo(champ.championId)
    )
  )

  const splashUrl = championMasteries[0]
    ? getChampionSplashUrl(championMasteries[0].id)
    : getChampionSplashUrl()

  return (
    <div className="mx-auto flex w-full max-w-280 flex-col items-start gap-8">
      {/* Profile info */}
      <div
        style={{
          backgroundImage: `
      linear-gradient(to right, rgb(0 0 0 / 0.8), rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.8)),
      url("${splashUrl}")
    `,
        }}
        className="flex w-full flex-row flex-wrap items-start gap-4 rounded-2xl bg-cover bg-top p-6"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              className="rounded-2xl border-4 border-primary/50"
              src={profileResponse.profile.profileIconUrl}
              width={150}
              height={150}
              alt={`${responseAccount.gameName} icon`}
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
          <div className="flex flex-row items-start gap-2">
            <Title>{responseAccount.gameName}</Title>
            <div className="flex flex-row items-center justify-center gap-1">
              <Title light>#{responseAccount.tagLine}</Title>
              <CopyButton
                value={`${responseAccount.gameName}#${responseAccount.tagLine}`}
              />
            </div>
          </div>
          <Button className="self-start">
            {/* <RefreshCw className="animate-spin" /> */}
            <RefreshCw />
            Update
          </Button>
        </div>
      </div>
      {/* Ranked / Match history */}
      <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-[3fr_7fr]">
        {/* Ranked stats */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {profileResponse.profile.rankedProfileData.map((rank) => (
              <RankedCard key={rank.queueType} rankedData={rank} />
            ))}
          </div>
          <Card className="p-4">
            <Typography bold>Champion mastery</Typography>
            {profileResponse.masteryProfileData.map((champ) => (
              <ChampionMasteryList key={champ.championId} masteryData={champ} />
            ))}
          </Card>
        </div>
        {/* Match history */}
        <div className="flex flex-col gap-2">
          <Card className="p-4">
            <Typography bold>Match history</Typography>
          </Card>
          <div className="flex flex-col gap-4">
            {profileResponse.matches.map((match) => (
              <MatchCard
                key={match.metadata.matchId}
                matchdata={match}
                puuid={responseAccount.puuid}
                region={region}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
