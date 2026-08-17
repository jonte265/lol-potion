import React from "react"
import Typography from "../common/typography/Typography"
import { calcQueueType, calcWr } from "@/lib/stat"
import Image from "next/image"

export default function RankedCard({ rankedData }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-card p-4">
      <Typography>{calcQueueType(rankedData.queueType)}</Typography>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          {rankedData.queueType === "JADE_RANKED_SOLO_5x5" ? (
            <Image
              className="rounded-full"
              src={`https://ddragon.leagueoflegends.com/cdn/16.16.1/img/profileicon/7185.png`}
              width={75}
              height={75}
              alt={`${rankedData.tier} rank logo`}
            />
          ) : (
            <Image
              src={`/images/ranked/rank=${rankedData.tier.toLowerCase()}.png`}
              width={75}
              height={75}
              alt={`${rankedData.tier} rank logo`}
            />
          )}

          <div>
            <Typography bold>
              {rankedData.tier} {rankedData.rank}
            </Typography>
            <Typography>{rankedData.leaguePoints} LP</Typography>
          </div>
        </div>

        <div>
          <Typography light>
            {rankedData.wins}W {rankedData.losses}L
          </Typography>
          <Typography light>
            {calcWr(rankedData.wins, rankedData.losses)}% Win rate
          </Typography>
        </div>
      </div>
    </div>
  )
}
