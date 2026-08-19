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

  const spellInfo = await res.json()

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

  const runeInfo = await res.json()

  const allRunes = runeInfo
    .flatMap((runeTree) => runeTree.slots)
    .flatMap((slot) => slot.runes)

  const foundRune = allRunes.find((rune) => rune.id === runeId)

  return foundRune
}

export async function getRunesStyle(runeStyleId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/runesReforged.json",
    {
      cache: "force-cache",
    }
  )

  const runeInfo = await res.json()

  const runeStyle = runeInfo.find((style) => style.id === runeStyleId)

  return runeStyle
}

export async function getItemsInfo(itemIds: number[]) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/item.json",
    {
      cache: "force-cache",
    }
  )

  const itemsInfo = await res.json()

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

export async function getChampionInfo(championId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/champion.json",
    {
      cache: "force-cache",
    }
  )

  const championsInfo = await res.json()

  const championArray = Object.values(championsInfo.data)

  const championData = championArray.find(
    (champ) => Number(champ.key) === championId
  )

  return championData
}
