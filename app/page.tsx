import H2 from "@/components/common/typography/H2"
import Title from "@/components/common/typography/Title"
import Typography from "@/components/common/typography/Typography"
import ProfileSearch from "@/components/features/profile-search"

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">LoL Potion</h1>
        <H2>Search League of Legends match history</H2>
      </div>
      <ProfileSearch />
    </div>
  )
}
