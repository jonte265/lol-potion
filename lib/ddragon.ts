type DDragonImage = {
  full: string
}

export type SummonerSpell = {
  key: string
  name: string
  description: string
  rangeBurn: string
  cooldownBurn: string
  image: DDragonImage
}

type SummonerSpellResponse = {
  data: Record<string, SummonerSpell>
}

export type Rune = {
  id: number
  key: string
  icon: string
  name: string
  shortDesc: string
  longDesc: string
}

type RuneSlot = {
  runes: Rune[]
}

export type RuneStyle = {
  id: number
  key: string
  icon: string
  name: string
  slots: RuneSlot[]
}

export type ItemInfo = {
  name: string
  plaintext: string
  description: string
  tags: string[]
  image: {
    full: string
  }
  gold: {
    total: number
    sell: number
  }
}

export type PlayerItemInfo = {
  itemId: number
  itemInfo: ItemInfo
  imageUrl: string
}

type ItemsResponse = {
  data: Record<string, ItemInfo>
}

export function getChampionImageUrl(championName: string) {
  const imageName =
    championName === "FiddleSticks" ? "Fiddlesticks" : championName

  return `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/champion/${imageName}.png`
}

export function getItemImageUrl(fileName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/item/${fileName}`
}

export function getSummonerSpellsImageUrl(fileName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/spell/${fileName}`
}

export function getRuneImageUrl(runeName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/img/${runeName}`
}

export function getChampionSplashUrl(championName?: string) {
  const champions = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Ashe",
    "Darius",
    "Draven",
    "Ezreal",
    "Fiora",
    "Garen",
    "Jax",
    "Jinx",
    "Katarina",
    "LeeSin",
    "Lux",
    "Malphite",
    "Morgana",
    "Nasus",
    "Riven",
    "Sion",
    "Teemo",
    "Thresh",
    "Tristana",
    "Vayne",
    "Vi",
    "Yasuo",
    "Yone",
    "Zed",
  ]

  if (!championName) {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[Math.floor(Math.random() * champions.length)]}_0.jpg`
  }

  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`
}

export async function getSummonerSpellsInfo(spellId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/summoner.json",
    {
      cache: "force-cache",
    }
  )

  const spellInfo: SummonerSpellResponse = await res.json()

  const spellArray = Object.values(spellInfo.data)

  const exactSpellInfo = spellArray.find(
    (spell) => Number(spell.key) === spellId
  )

  if (!exactSpellInfo) return null

  return {
    ...exactSpellInfo,
    imageUrl: getSummonerSpellsImageUrl(exactSpellInfo.image.full),
  }
}

export async function getRunesInfo(runeId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/runesReforged.json",
    {
      cache: "force-cache",
    }
  )

  const runeInfo: RuneStyle[] = await res.json()

  const allRunes = runeInfo
    .flatMap((runeTree) => runeTree.slots)
    .flatMap((slot) => slot.runes)

  const foundRune = allRunes.find((rune) => rune.id === runeId)

  if (!foundRune) return null

  return {
    ...foundRune,
    imageUrl: getRuneImageUrl(foundRune.icon),
  }
}

export async function getRunesStyle(runeStyleId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/runesReforged.json",
    {
      cache: "force-cache",
    }
  )

  const runeInfo: RuneStyle[] = await res.json()

  const runeStyle = runeInfo.find((style) => style.id === runeStyleId)

  if (!runeStyle) return null

  return {
    ...runeStyle,
    imageUrl: getRuneImageUrl(runeStyle.icon),
  }
}

export async function getItemsInfo(
  itemIds: number[]
): Promise<(PlayerItemInfo | null)[]> {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/item.json",
    {
      cache: "force-cache",
    }
  )

  const itemsInfo: ItemsResponse = await res.json()

  const allItemsInfo = itemIds.map((id) => {
    if (id === 0) return null

    const item = itemsInfo.data[id]

    if (!item) return null

    return {
      itemId: id,
      itemInfo: item,
      imageUrl: getItemImageUrl(item.image.full),
    }
  })

  return allItemsInfo
}

export type ChampionInfo = {
  id: string
  key: string
  name: string
  title: string
}

export async function getChampionInfo(
  championId: number
): Promise<ChampionInfo | undefined> {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/champion.json",
    {
      cache: "force-cache",
    }
  )

  const championsInfo = await res.json()

  const championArray = Object.values(championsInfo.data) as ChampionInfo[]

  const championData = championArray.find(
    (champ) => Number(champ.key) === championId
  )

  return championData
}
