import TeamStatsTable from "./team-stats-table"
import type { MatchData } from "@/lib/riot"

type ExpandMatchProps = {
  matchdata: MatchData
  puuid: string
  region: string
}

export default function ExpandMatch({
  matchdata,
  puuid,
  region,
}: ExpandMatchProps) {
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

  return (
    <div className="bg-card">
      {/* Team Stats screen */}
      <div className="flex flex-col gap-4">
        <TeamStatsTable
          team={blueTeam}
          puuid={puuid}
          highestDamage={highestDamage}
          gameDuration={matchdata.info.gameDuration}
          region={region}
        />
        <TeamStatsTable
          team={redTeam}
          puuid={puuid}
          highestDamage={highestDamage}
          gameDuration={matchdata.info.gameDuration}
          region={region}
        />
      </div>
    </div>
  )
}
