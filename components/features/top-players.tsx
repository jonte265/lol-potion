import { getTopChallengerPlayers } from "@/lib/riot"
import Typography from "../common/typography/Typography"
import { Card } from "../ui/card"
import Image from "next/image"
import { calcWr } from "@/lib/stat"
import Link from "next/link"

export default async function TopPlayers({
  region,
  continent,
}: {
  region: string
  continent: string
}) {
  const topChallengers = await getTopChallengerPlayers(region, continent)

  return (
    <Card className="flex w-full flex-col justify-center p-4">
      <div className="text-center">
        <Typography bold>
          Best Players rankings {region.toUpperCase()}
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        {topChallengers.map((player, index) => (
          <div className="flex flex-row justify-between" key={player.puuid}>
            <div className="flex flex-row items-center gap-4">
              <Typography bold>{index + 1}</Typography>
              <div className="flex flex-row items-center gap-2">
                <div className="relative">
                  <Image
                    className="rounded-xl"
                    src={player.profileIconUrl}
                    width={50}
                    height={50}
                    alt={`${player.accountProfile.gameName} icon`}
                  />

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-xl bg-background px-2">
                    <Typography small>
                      {player.summonerProfile.summonerLevel}
                    </Typography>
                  </div>
                </div>

                <Link
                  href={`/profile/${region}/${player.accountProfile.gameName}/${player.accountProfile.tagLine}`}
                >
                  <div className="flex flex-row gap-0.5 hover:underline">
                    <Typography>{player.accountProfile.gameName}</Typography>
                    <Typography light>
                      #{player.accountProfile.tagLine}
                    </Typography>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <Typography bold>{player.leaguePoints} LP</Typography>
              <Typography light>
                Wins: {player.wins} ({calcWr(player.wins, player.losses)}%)
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
