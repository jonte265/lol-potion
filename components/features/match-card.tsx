import Image from "next/image"
import Typography from "../common/typography/Typography"
import {
  getChampionImageUrl,
  getSummonerSpellsImageUrl,
  getSummonerSpellsInfo,
} from "@/lib/ddragon"
import { formatGameDuration, getQueueName, timeAgo } from "@/lib/matches"

export default async function MatchCard({ matchdata, puuid }) {
  const player = matchdata.info.participants.find((p) => p.puuid === puuid)
  console.log("player", player)

  const spellsInfo1 = await getSummonerSpellsInfo(player.summoner1Id)
  const spellsInfo2 = await getSummonerSpellsInfo(player.summoner2Id)
  console.log(spellsInfo1, "spellsInfo")

  return (
    <div
      className={`flex flex-col rounded-2xl p-4 ${player.win ? "bg-primary/20" : "bg-destructive/20"}`}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <Typography>{getQueueName(matchdata.info.queueId)}</Typography>
            <Typography light>
              {timeAgo(matchdata.info.gameEndTimestamp)}
            </Typography>
          </div>
          <div>
            <div className={player.win ? "text-primary" : "text-destructive"}>
              <Typography bold>{player.win ? "WIN" : "LOSS"}</Typography>
            </div>
            <Typography>
              {formatGameDuration(matchdata.info.gameDuration)}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="relative">
            <Image
              className="rounded-xs"
              src={getChampionImageUrl(player.championName)}
              width={50}
              height={50}
              alt={`${player.championName} icon`}
            />

            <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
              <Typography>{player.champLevel}</Typography>
            </div>
          </div>

          <div className="flex flex-row">
            <Image
              className="rounded-xs"
              src={getSummonerSpellsImageUrl(spellsInfo1.image.full)}
              width={25}
              height={25}
              alt={`${player.championName} icon`}
            />
            <Image
              className="rounded-xs"
              src={getSummonerSpellsImageUrl(spellsInfo2.image.full)}
              width={25}
              height={25}
              alt={`${player.championName} icon`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
