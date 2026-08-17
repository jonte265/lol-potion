import Image from "next/image"
import Typography from "../common/typography/Typography"
import { getChampionImageUrl, getChampionInfo } from "@/lib/ddragon"
import { formatCompactNumber } from "@/lib/format"

export default async function ChampionMasteryList({ masteryData }) {
  const champInfo = await getChampionInfo(masteryData.championId)

  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          src={getChampionImageUrl(champInfo.id)}
          width={25}
          height={25}
          alt={`${champInfo.name} icon`}
        />
        <Typography>{champInfo.name}</Typography>
      </div>
      <Typography>{masteryData.championLevel} Mastery</Typography>
      <div className="justify-self-end">
        <Typography light>
          {formatCompactNumber(masteryData.championPoints)} pts
        </Typography>
      </div>
    </div>
  )
}
