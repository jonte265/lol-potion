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

export default function TeamStatsTable({ team, puuid }) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-52">
            Team 1 (Red team){" "}
            {/* {matchdata.info.teams[0].win ? "Victory" : "Defeat"} */}
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
        {team.map((player) => (
          <TableRow key={player.puuid}>
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
                </div>
                <div className="flex flex-col">
                  <Typography>{player.riotIdGameName}</Typography>
                  <Typography light>{player.championName}</Typography>
                </div>
              </div>
            </TableCell>
            <TableCell>51</TableCell>
            <TableCell>1/13/1</TableCell>
            <TableCell>1231</TableCell>
            <TableCell>123123k</TableCell>
            <TableCell>12</TableCell>
            <TableCell>14</TableCell>
            <TableCell className="text-right">Item1</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
