import Image from "next/image"
import Typography from "../common/typography/Typography"
import {
  getChampionImageUrl,
  getItemImageUrl,
  getItemsInfo,
  getRuneImageUrl,
  getRunesInfo,
  getRunesStyle,
  getSummonerSpellsImageUrl,
  getSummonerSpellsInfo,
} from "@/lib/ddragon"
import { formatGameDuration, getQueueName, timeAgo } from "@/lib/matches"
import { Coins } from "lucide-react"
import { calcCs, calcCsPerMin } from "@/lib/stat"
import Link from "next/link"
import { Card } from "../ui/card"

export default async function MatchCard({ matchdata, puuid }) {
  const player = matchdata.info.participants.find((p) => p.puuid === puuid)
  console.log("player", player)

  const team1 = matchdata.info.participants.slice(0, 5)
  const team2 = matchdata.info.participants.slice(5)

  console.log("team1", team1)

  const spellsInfo1 = await getSummonerSpellsInfo(player.summoner1Id)
  const spellsInfo2 = await getSummonerSpellsInfo(player.summoner2Id)
  console.log(spellsInfo1, "spellsInfo")

  const runeInfo1 = await getRunesInfo(
    player.perks.styles[0].selections[0].perk
  )
  const runeStyle = await getRunesStyle(player.perks.styles[1].style)

  console.log("runeInfo111111", runeInfo1)
  console.log("runeStyleruneStyle", runeStyle)

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

  const playerItemsInfo = await Promise.all(
    playerItems.filter((itemId) => itemId !== 0).map((i) => getItemsInfo(i))
  )

  console.log("playerItemsInfo", playerItemsInfo)

  return (
    <Card
      className={`${player.win ? "bg-primary/30" : "bg-destructive/20"} p-4`}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          <div>
            <Typography>{getQueueName(matchdata.info.queueId)}</Typography>
            <Typography light>
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
        <div className="flex flex-row items-start gap-0.5">
          <div>
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
            <Typography light>{player.championName}</Typography>
            <Typography sentenceCase light>
              {player.teamPosition}
            </Typography>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <Image
                className="rounded-xs"
                src={getSummonerSpellsImageUrl(spellsInfo1.image.full)}
                width={25}
                height={25}
                alt={`${player.championName} icon`}
              />
              <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
                <Typography small light>
                  {player.summoner1Casts}
                </Typography>
              </div>
            </div>
            <div className="relative">
              <Image
                className="rounded-xs"
                src={getSummonerSpellsImageUrl(spellsInfo2.image.full)}
                width={25}
                height={25}
                alt={`${player.championName} icon`}
              />
              <div className="absolute bottom-0 rounded-xs bg-background px-0.5">
                <Typography small light>
                  {player.summoner2Casts}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Image
              className="rounded-xs"
              src={getRuneImageUrl(runeInfo1?.icon)}
              width={25}
              height={25}
              alt={`${player.championName} icon`}
            />
            <Image
              className="rounded-xs"
              src={getRuneImageUrl(runeStyle?.icon)}
              width={25}
              height={25}
              alt={`${player.championName} icon`}
            />
          </div>
        </div>
        {/* Column 3 stats */}
        <div className="flex flex-row items-start gap-0.5">
          <div>
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
              {(player.goldEarned / 1000).toFixed(1)}K Gold
            </Typography>
          </div>
        </div>
        {/* Column 4 items */}
        <div className="flex flex-row items-start gap-0.5">
          <div className="grid grid-cols-4 gap-1">
            {playerItemsInfo.map((item, index) => (
              <Image
                key={`${item.image.full}-${index}`}
                className="rounded-xs"
                src={getItemImageUrl(item.image.full)}
                width={25}
                height={25}
                alt={`${item.name} icon`}
              />
            ))}
          </div>
        </div>
        {/* Column 5 players */}
        <div className="flex flex-row items-start gap-0.5">
          <div className="flex flex-row gap-4">
            <div>
              {team1.map((player) => (
                <div
                  key={player.puuid}
                  className="flex flex-row items-center gap-1"
                >
                  <Image
                    className="rounded-full"
                    src={getChampionImageUrl(player.championName)}
                    width={25}
                    height={25}
                    alt={`${player.championName} icon`}
                  />

                  <Link
                    className="block w-24 truncate text-sm hover:underline"
                    href={`/profile/${player.riotIdGameName}/${player.riotIdTagline}`}
                    title={player.riotIdGameName}
                  >
                    {player.riotIdGameName}
                  </Link>
                </div>
              ))}
            </div>
            <div>
              {team2.map((player) => (
                <div
                  key={player.puuid}
                  className="flex flex-row items-center gap-1"
                >
                  <Image
                    className="rounded-full"
                    src={getChampionImageUrl(player.championName)}
                    width={25}
                    height={25}
                    alt={`${player.championName} icon`}
                  />

                  <Link
                    className="block w-24 truncate text-sm hover:underline"
                    href={`/profile/${player.riotIdGameName}/${player.riotIdTagline}`}
                    title={player.riotIdGameName}
                  >
                    {player.riotIdGameName}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
