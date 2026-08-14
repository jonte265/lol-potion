export function calcWr(wins: number, losses: number) {
  const total = wins + losses

  if (total === 0) return 0

  const wr = (wins / total) * 100

  return Math.round(wr)
}
