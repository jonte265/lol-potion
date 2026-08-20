import {
  getChampionImageUrl,
  getItemsInfo,
  getRunesInfo,
  getRunesStyle,
  getSummonerSpellsInfo,
} from "@/lib/ddragon"
import { formatCompactNumber } from "@/lib/format"
import { formatGameDuration, getQueueName, timeAgo } from "@/lib/matches"
import { calcCs, calcCsPerMin } from "@/lib/stat"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Typography from "../common/typography/Typography"
import { buttonVariants } from "../ui/button"
import { Card } from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import ExpandMatch from "./expand-match"
import ItemInventory from "./item-inventory"
import RuneIcon from "./rune-icon"
import SummonerSpellIcon from "./summoner-spell-icon"
import type { MatchData } from "@/lib/riot"

type MatchCardProps = {
  matchdata: MatchData
  puuid: string
  region: string
}

export default async function MatchCard({
  matchdata,
  puuid,
  region,
}: MatchCardProps) {
  const player = matchdata.info.participants.find((p) => p.puuid === puuid)!

  const blueTeam = matchdata.info.participants.filter(
    (player) => player.teamId === 100
  )

  const redTeam = matchdata.info.participants.filter(
    (player) => player.teamId === 200
  )

  const spellsInfo1 = await getSummonerSpellsInfo(player.summoner1Id)
  const spellsInfo2 = await getSummonerSpellsInfo(player.summoner2Id)

  const runeInfo1 = await getRunesInfo(
    player.perks.styles[0].selections[0].perk
  )
  const runeStyle = await getRunesStyle(player.perks.styles[1].style)

  const cs = calcCs(player.totalMinionsKilled, player.neutralMinionsKilled)
  const csPerMin = calcCsPerMin(cs, matchdata.info.gameDuration)

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
    <Card
      className={`${player.win ? "bg-primary/30" : "bg-destructive/20"} p-0`}
    >
      <Collapsible className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between gap-4 p-4">
          {/* Column 1 */}
          <div className="flex min-w-25 flex-col gap-2">
            <div>
              <Typography bold>
                {getQueueName(matchdata.info.queueId)}
              </Typography>
              <Typography small light>
                {timeAgo(matchdata.info.gameEndTimestamp)}
              </Typography>
            </div>
            <div className="flex flex-row gap-2">
              <div className={player.win ? "text-primary" : "text-destructive"}>
                <Typography bold>{player.win ? "WIN" : "LOSS"}</Typography>
              </div>
              <Typography>
                {formatGameDuration(matchdata.info.gameDuration)}
              </Typography>
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col">
            {/* Champ icon + summoner spells + runes */}
            <div className="flex flex-row items-center gap-0.5">
              {/* Champ icon */}
              <div className="relative shrink-0">
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
              {/* Summoner spells */}
              <div className="flex shrink-0 flex-col gap-0.5">
                <SummonerSpellIcon
                  player={player}
                  spellInfo={spellsInfo1}
                  spellSlot={1}
                  size={24}
                />
                <SummonerSpellIcon
                  player={player}
                  spellInfo={spellsInfo2}
                  spellSlot={2}
                  size={24}
                />
              </div>
              {/* Runes */}
              <div className="flex shrink-0 flex-col gap-0.5">
                <RuneIcon runeInfo={runeInfo1} size={24} />
                <RuneIcon runeInfo={runeStyle} size={24} />
              </div>
            </div>
            {/* text */}
            <div>
              <Typography light>{player.championName}</Typography>
              <Typography sentenceCase light>
                {player.teamPosition}
              </Typography>
            </div>
          </div>
          {/* Column 3 stats */}
          <div className="flex flex-col">
            <div className="flex flex-row gap-1">
              <Typography bold>{player.kills}</Typography>
              <Typography bold light>
                /
              </Typography>
              <div className="text-destructive">
                <Typography bold>{player.deaths}</Typography>
              </div>
              <Typography bold light>
                /
              </Typography>
              <Typography bold>{player.assists}</Typography>
            </div>
            <div className="flex flex-row gap-1">
              <Typography bold>{player.challenges.kda.toFixed(1)}</Typography>
              <Typography light>KDA</Typography>
            </div>
            <Typography light>
              {cs} CS ({csPerMin.toFixed(1)})
            </Typography>
            <Typography light>
              {formatCompactNumber(player.goldEarned)} Gold
            </Typography>
          </div>
          {/* Column 4 items */}
          <div className="flex shrink-0 flex-row">
            <div className="grid grid-cols-4 gap-1">
              {playerItemsInfo.map((item, index) => (
                <ItemInventory
                  key={`${item?.itemId ?? "empty"}-${index}`}
                  item={item}
                  size={25}
                />
              ))}
            </div>
          </div>
          {/* Column 5 players */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-0.5">
              {blueTeam.map((player) => (
                <div
                  key={player.puuid}
                  className="flex flex-row items-center gap-1"
                >
                  <Image
                    className={`${player.puuid === puuid ? "ring-1 ring-foreground/80" : ""} rounded-full`}
                    src={getChampionImageUrl(player.championName)}
                    width={20}
                    height={20}
                    alt={`${player.championName} icon`}
                  />

                  <Link
                    className={`${player.puuid === puuid ? "font-bold" : ""} block w-24 truncate text-sm hover:underline`}
                    href={`/profile/${region}/${player.riotIdGameName}/${player.riotIdTagline}`}
                    title={player.riotIdGameName}
                  >
                    {player.riotIdGameName}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              {redTeam.map((player) => (
                <div
                  key={player.puuid}
                  className="flex flex-row items-center gap-1"
                >
                  <Image
                    className={`${player.puuid === puuid ? "ring-1 ring-foreground/80" : ""} rounded-full`}
                    src={getChampionImageUrl(player.championName)}
                    width={20}
                    height={20}
                    alt={`${player.championName} icon`}
                  />

                  <Link
                    className={`${player.puuid === puuid ? "font-bold" : ""} block w-24 truncate text-sm hover:underline`}
                    href={`/profile/${region}/${player.riotIdGameName}/${player.riotIdTagline}`}
                    title={player.riotIdGameName}
                  >
                    {player.riotIdGameName}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Column 6 */}
          <div className="flex flex-col self-end">
            <CollapsibleTrigger
              type="button"
              aria-label="Show match details"
              className={cn(
                buttonVariants({ size: "icon-sm" }),
                player.win
                  ? "bg-primary/30"
                  : "bg-destructive/20 hover:bg-destructive/40 active:bg-destructive/40"
              )}
            >
              <ChevronDownIcon className="transition-all group-data-panel-open/button:rotate-180" />
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <ExpandMatch matchdata={matchdata} puuid={puuid} region={region} />
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
