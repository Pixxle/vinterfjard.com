import { Languages, Award, Trophy } from "lucide-react"

interface LanguageItemProps {
  language: string
  level: string
  isNative?: boolean
}

function LanguageItem({ language, level, isNative }: LanguageItemProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>{language}</span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${isNative ? "bg-blue-900 text-blue-300" : "bg-blue-800 text-blue-200"}`}
      >
        {level}
      </span>
    </div>
  )
}

export default function LanguagesCertificationsAwards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Languages */}
      <div>
        <div className="flex items-center mb-4">
          <Languages className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-medium">Languages</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <LanguageItem language="Svenska" level="Native" isNative={true} />
          <LanguageItem language="Engelska" level="Proficient" />
        </div>
      </div>

      {/* Certification */}
      <div>
        <div className="flex items-center mb-4">
          <Award className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-medium">Certification</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <div className="mb-2">
            <div className="font-medium">Att leda i komplexitet</div>
            <div className="text-sm text-gray-400">iero ledarutveckling</div>
          </div>
        </div>
      </div>

      {/* Awards */}
      <div>
        <div className="flex items-center mb-4">
          <Trophy className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-medium">Awards</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <div className="mb-2">
            <a href="#" className="text-blue-400 hover:underline">
              2023 Newcomer of the Year
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
