import Image from "next/image"
import Typography from "../common/typography/Typography"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { getChampionImageUrl } from "@/lib/ddragon"
import { formatCompactNumber } from "@/lib/format"
import { Progress } from "../ui/progress"
import { Flame } from "lucide-react"
import { calcCs, calcCsPerMin } from "@/lib/stat"

export default function TeamStatsTable({
  team,
  puuid,
  highestDamage,
  gameDuration,
}) {
  return (
    <div className="overflow-hidden rounded-xl">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-32">
              <div className="flex flex-row gap-1">
                <div
                  className={team[0].win ? `text-primary` : `text-destructive`}
                >
                  <Typography bold>
                    {team[0].win ? "Victory" : "Defeat"}{" "}
                  </Typography>
                </div>
                <Typography>
                  {team[0].teamId === 100 ? "(Blue Team)" : "(Red Team)"}
                </Typography>
              </div>
            </TableHead>
            <TableHead>Carry</TableHead>
            <TableHead>KDA</TableHead>
            <TableHead>Damage</TableHead>
            <TableHead>Gold</TableHead>
            <TableHead>CS</TableHead>
            <TableHead>Wards</TableHead>
            <TableHead className="text-right">Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((player) => {
            const cs = calcCs(
              player.totalMinionsKilled,
              player.neutralMinionsKilled
            )

            const csPerMin = calcCsPerMin(cs, gameDuration)

            return (
              <TableRow
                className={`${player.win ? "bg-primary/30" : "bg-destructive/20"} `}
                key={player.puuid}
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
                      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background px-0.5">
                        <Typography light small>
                          {player.summonerLevel}
                        </Typography>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Typography bold>{player.riotIdGameName}</Typography>
                      <Typography light>{player.championName}</Typography>
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
                    <Typography bold>
                      {player.challenges.kda.toFixed(1)}
                    </Typography>
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
                        value={
                          (player.totalDamageDealtToChampions / highestDamage) *
                          100
                        }
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatCompactNumber(player.goldEarned)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{cs}</Typography>
                  <Typography light>({csPerMin.toFixed(1)})</Typography>
                </TableCell>
                <TableCell>{player.wardsPlaced}</TableCell>
                <TableCell className="text-right">Item1</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
