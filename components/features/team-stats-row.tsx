import Image from "next/image"
import { TableCell, TableRow } from "../ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Typography from "../common/typography/Typography"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Flame } from "lucide-react"
import { Progress } from "../ui/progress"
import { getChampionImageUrl, getItemsInfo } from "@/lib/ddragon"
import { calcCs, calcCsPerMin } from "@/lib/stat"
import { formatCompactNumber } from "@/lib/format"
import ItemInventory from "./item-inventory"

export default async function TeamStatsRow({
  player,
  puuid,
  gameDuration,
  highestDamage,
}) {
  const cs = calcCs(player.totalMinionsKilled, player.neutralMinionsKilled)
  const csPerMin = calcCsPerMin(cs, gameDuration)

  const playerItems = [
    player.item0,
    player.item1,
    player.item2,
    player.item6, // Ward item
    player.item3,
    player.item4,
    player.item5,
  ]

  const playerItemsInfo = await getItemsInfo(playerItems)

  return (
    <TableRow
      className={`${player.win ? "bg-primary/30" : "bg-destructive/20"} `}
    >
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          {/* Champ icon */}
          <div className="relative shrink-0">
            <Image
              className={`${player.puuid === puuid ? "rounded-full ring-1 ring-foreground/80" : "rounded-xs"} `}
              src={getChampionImageUrl(player.championName)}
              width={40}
              height={40}
              alt={`${player.championName} icon`}
            />

            <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
              <Typography small>{player.champLevel}</Typography>
            </div>
            <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xs bg-background px-0.5 py-0">
              <Tooltip>
                <TooltipTrigger>
                  <Typography light small>
                    {player.summonerLevel}
                  </Typography>
                </TooltipTrigger>
                <TooltipContent>
                  Summoner level when this match was played
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              className={`block w-24 truncate text-sm font-bold hover:underline`}
              href={`/profile/${player.riotIdGameName}/${player.riotIdTagline}`}
              title={player.riotIdGameName}
            >
              {player.riotIdGameName}
            </Link>
            <div className="flex flex-row gap-1">
              <Typography light>{player.championName}</Typography>
              {player.pentaKills > 0 && <Badge>Pentakill</Badge>}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>51</TableCell>
      <TableCell>
        <div className="flex flex-row gap-1">
          <Typography>{player.kills}</Typography>
          <Typography light>/</Typography>
          <div>
            <Typography>{player.deaths}</Typography>
          </div>
          <Typography light>/</Typography>
          <Typography>{player.assists}</Typography>
        </div>
        <div className="flex flex-row gap-1">
          <Typography bold>{player.challenges.kda.toFixed(1)}</Typography>
          <Typography light>KDA</Typography>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            {player.totalDamageDealtToChampions === highestDamage && (
              <Flame className="size-4 text-orange-400" />
            )}
            <Typography>
              {new Intl.NumberFormat("en-US").format(
                player.totalDamageDealtToChampions
              )}{" "}
            </Typography>
          </div>
          <div>
            <Progress
              className={`[&_[data-slot=progress-track]]:h-2 ${
                player.win
                  ? "[&_[data-slot=progress-indicator]]:bg-primary"
                  : "[&_[data-slot=progress-indicator]]:bg-destructive"
              }`}
              value={(player.totalDamageDealtToChampions / highestDamage) * 100}
            />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Typography>{formatCompactNumber(player.goldEarned)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{cs}</Typography>
        <Typography light>({csPerMin.toFixed(1)})</Typography>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger>
            <Typography>{player.visionScore}</Typography>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col">
              <Typography>{player.wardsPlaced} wards placed</Typography>
              <Typography>{player.wardsKilled} wards destroyed</Typography>
              <Typography>
                {player.detectorWardsPlaced} Control wards placed
              </Typography>
            </div>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <div className="inline-grid grid-cols-4 gap-0.5">
          {playerItemsInfo.map((item, index) => (
            <ItemInventory
              key={`${item?.itemId ?? "empty"}-${index}`}
              item={item}
              size={16}
            />
          ))}
        </div>
      </TableCell>
    </TableRow>
  )
}
