import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Typography from "../common/typography/Typography"

export default function SummonerSpellIcon({ spellInfo, player, spellSlot }) {
  if (!spellInfo) return null

  return (
    <div className="relative">
      <Image
        className="rounded-xs"
        src={spellInfo.imageUrl}
        width={24}
        height={24}
        alt={`${spellInfo.name} icon`}
      />
      <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
        <Tooltip>
          <TooltipTrigger>
            <Typography small light>
              {spellSlot === 1 ? player.summoner1Casts : player.summoner2Casts}
            </Typography>
          </TooltipTrigger>
          <TooltipContent>Amount of times used</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
