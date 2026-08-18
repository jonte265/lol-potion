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
import TeamStatsTable from "./team-stats-table"

export default function ExpandMatch({ matchdata, puuid }) {
  const blueTeam = matchdata.info.participants.filter(
    (player) => player.teamId === 100
  )

  const redTeam = matchdata.info.participants.filter(
    (player) => player.teamId === 200
  )

  const highestDamage = Math.max(
    ...matchdata.info.participants.map(
      (player) => player.totalDamageDealtToChampions
    )
  )

  const player = matchdata.info.participants.find((p) => p.puuid === puuid)

  return (
    <div className="bg-card p-4">
      {/* Team Stats screen */}
      <div className="flex flex-col gap-8">
        <TeamStatsTable
          team={blueTeam}
          puuid={puuid}
          highestDamage={highestDamage}
        />
        <TeamStatsTable
          team={redTeam}
          puuid={puuid}
          highestDamage={highestDamage}
        />
      </div>
    </div>
  )
}
