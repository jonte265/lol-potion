import Image from "next/image"
import Typography from "../common/typography/Typography"
import { getChampionImageUrl } from "@/lib/ddragon"

export default function MatchCard({ matchdata, puuid }) {
  const player = matchdata.info.participants.find((p) => p.puuid === puuid)

  console.log("player", player)

  return (
    <div
      className={`flex flex-col rounded-2xl p-4 ${player.win ? "bg-primary/20" : "bg-destructive/20"}`}
    >
      <div className="flex flex-col">
        <Typography>{matchdata.info.gameDuration}</Typography>
        <Typography bold>{player.win ? "WIN" : "LOSS"}</Typography>
        <Image
          src={getChampionImageUrl(player.championName)}
          width={75}
          height={75}
          alt={`${player.championName} icon`}
        />
      </div>
    </div>
  )
}
