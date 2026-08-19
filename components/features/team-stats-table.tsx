import Typography from "../common/typography/Typography"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import TeamStatsRow from "./team-stats-row"

export default function TeamStatsTable({
  team,
  puuid,
  highestDamage,
  gameDuration,
}) {
  return (
    <div className="overflow-hidden rounded-xl">
      <Table>
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
            <TableHead>Vision</TableHead>
            <TableHead className="text-right">Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((player) => (
            <TeamStatsRow
              key={player.puuid}
              player={player}
              puuid={puuid}
              gameDuration={gameDuration}
              highestDamage={highestDamage}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
