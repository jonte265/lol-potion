import Logo from "../common/logo"
import ProfileSearch from "../features/profile-search"

export default function SiteHeader() {
  return (
    <div className="flex flex-row items-center justify-between">
      <Logo />
      <ProfileSearch header />
    </div>
  )
}
