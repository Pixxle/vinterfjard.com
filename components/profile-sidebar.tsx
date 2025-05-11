import Image from "next/image"
import { Building, MapPin, Link, Cloud, Users, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileSidebarProps {
  profile?: {
    name: string
    login: string
    bio: string
    company: string
    location: string
    websiteUrl: string
    followers: { totalCount: number }
    following: { totalCount: number }
  }
}

export default function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <div className="w-full md:w-[296px] md:shrink-0">
      <div className="relative mb-4">
        <div className="rounded-full overflow-hidden border-4 border-[#0d1117] w-[296px] h-[296px] mx-auto md:mx-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5764762.jpg-pZeMnKK9Pb1WsTSCkx5CZlBsALOcuL.jpeg"
            alt="Dennis Vinterfjärd"
            width={296}
            height={296}
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-bold">{profile?.name || "Dennis Vinterfjärd"}</h1>
        <p className="text-gray-400">{profile?.login || "Pixxle"}</p>
      </div>

      <div className="mb-4">
        <a href="https://github.com/pixxle" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="w-full bg-[#21262d] border-gray-600 hover:bg-[#30363d] hover:border-gray-400"
          >
            Follow
          </Button>
        </a>
      </div>

      <div className="mb-4 text-gray-300">
        <p className="mb-2">{profile?.bio || "night owl 🦉 I do tech stuff from time to time. 👨‍💻"}</p>
      </div>

      <div className="mb-4 text-sm text-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-gray-500" />
          <span>
            <strong>{profile?.followers?.totalCount || 0}</strong> followers ·{" "}
            <strong>{profile?.following?.totalCount || 0}</strong> following
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Building className="w-4 h-4 text-gray-500" />
          <span>{profile?.company || "MedHelp Care"}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{profile?.location || "Sweden"}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Link className="w-4 h-4 text-gray-500" />
          <a href={"https://vinterfjard.com"} className="text-blue-400 hover:underline">
            {profile?.websiteUrl?.replace(/^https?:\/\//, "") || "vinterfjard.com"}
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Cloud className="w-4 h-4 text-gray-500" />
          <a href="https://bsky.app/profile/dennis.vinterfjard.com" className="text-blue-400 hover:underline">
            @dennis.vinterfjard.com
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4 text-gray-500" />
          <a href="mailto:dennis@vinterfjard.com" className="text-blue-400 hover:underline">
            dennis@vinterfjard.com
          </a>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Linkedin className="w-4 h-4 text-gray-500" />
          <a href="https://www.linkedin.com/in/dennis-vinterfj%C3%A4rd/" className="text-blue-400 hover:underline">
            dennis-vinterfjärd
          </a>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-base font-medium mb-2">Achievements</h2>
        <div className="flex flex-wrap gap-2">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-xs">🏆</span>
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-xs">⭐</span>
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-xs">🚀</span>
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-xs">🎯</span>
          </div>
        </div>
      </div>
    </div>
  )
}
