import H2 from "@/components/common/typography/H2"
import ProfileSearch from "@/components/features/profile-search"
import TopPlayers from "@/components/features/top-players"
import { getChampionSplashUrl } from "@/lib/ddragon"

// Cache
export const revalidate = 60 * 60

export default function Page() {
  const splashUrl = getChampionSplashUrl("Sion")

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex min-h-72 items-center justify-center overflow-hidden sm:min-h-80 lg:min-h-128 xl:min-h-160">
        <div
          style={{ backgroundImage: `url("${splashUrl}")` }}
          className="absolute inset-0 rounded-2xl bg-cover bg-top"
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />

        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center gap-8 text-center">
          <div>
            <h1 className="text-4xl font-bold">LoL Potion</h1>
            <H2>Search League of Legends match history</H2>
          </div>

          <div className="w-full">
            <ProfileSearch />
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-400 grid-cols-1 gap-8 md:grid-cols-3">
        <TopPlayers region={"euw1"} continent={"europe"} />
        <TopPlayers region={"na1"} continent={"americas"} />
        <TopPlayers region={"kr"} continent={"asia"} />
      </div>
    </div>
  )
}
