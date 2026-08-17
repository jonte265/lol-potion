export function calcWr(wins: number, losses: number) {
  const total = wins + losses

  if (total === 0) return 0

  const wr = (wins / total) * 100

  return Math.round(wr)
}

export function calcQueueType(queue: string) {
  if (queue === "RANKED_PREMADE_5x5") {
    return "Ranked Premade"
  }

  if (queue === "RANKED_FLEX_SR") {
    return "Ranked Flex"
  }

  if (queue === "RANKED_SOLO_5x5") {
    return "Ranked Solo/Duo"
  }

  if (queue === "JADE_RANKED_SOLO_5x5") {
    return "Classic Summoner’s Journey"
  }

  return queue
}

export function calcCs(totalMinions: number, neutralMinions: number) {
  return totalMinions + neutralMinions
}

export function calcCsPerMin(cs: number, gameDurationSeconds: number) {
  if (gameDurationSeconds === 0) return 0
  return cs / (gameDurationSeconds / 60)
}
