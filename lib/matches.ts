export function getQueueName(queueId: number) {
  const queues: Record<number, string> = {
    400: "Normal Draft",
    420: "Ranked Solo/Duo",
    430: "Normal Blind",
    440: "Ranked Flex",
    450: "ARAM",
    490: "Quickplay",
    700: "Clash",
    830: "Co-op vs AI Intro",
    840: "Co-op vs AI Beginner",
    850: "Co-op vs AI Intermediate",
  }

  return queues[queueId] ?? `Queue ${queueId}`
}

export function formatGameDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp

  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`
  if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
}
