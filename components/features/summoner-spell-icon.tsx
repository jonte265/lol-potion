import Image from "next/image"
import Typography from "../common/typography/Typography"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import type { SummonerSpell } from "@/lib/ddragon"
import type { MatchParticipant } from "@/lib/riot"

type SummonerSpellIconProps = {
  spellInfo: (SummonerSpell & { imageUrl: string }) | null
  player: MatchParticipant
  spellSlot: 1 | 2
  size: number
}

export default function SummonerSpellIcon({
  spellInfo,
  player,
  spellSlot,
  size,
}: SummonerSpellIconProps) {
  if (!spellInfo) return null

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger
          render={
            <Image
              className="rounded-xs"
              src={spellInfo.imageUrl}
              width={size}
              height={size}
              alt={`${spellInfo.name} icon`}
            />
          }
        />

        <TooltipContent>
          <div className="flex flex-col flex-wrap gap-2">
            <div className="flex flex-col">
              <Typography bold>{spellInfo.name}</Typography>
            </div>
            <div className="flex flex-col">
              <Typography>{spellInfo.description}</Typography>
            </div>
            <div className="flex flex-col">
              <Typography light>Range: {spellInfo.rangeBurn}</Typography>
              <Typography light>Cooldown: {spellInfo.cooldownBurn}s</Typography>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
        <Tooltip>
          <TooltipTrigger
            render={
              <Typography small light>
                {spellSlot === 1
                  ? player.summoner1Casts
                  : player.summoner2Casts}
              </Typography>
            }
          />

          <TooltipContent>Amount of times used</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
