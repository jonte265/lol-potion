import H2 from "@/components/common/typography/H2"
import Title from "@/components/common/typography/Title"
import Typography from "@/components/common/typography/Typography"
import ProfileSearch from "@/components/features/profile-search"
import { getChampionSplashUrl } from "@/lib/ddragon"

export default function Page() {
  const splashUrl = getChampionSplashUrl("Sion")

  return (
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
  )
}
