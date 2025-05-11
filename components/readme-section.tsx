import Link from "next/link"

export default function ReadmeSection() {
  return (
    <div className="mb-8 border border-gray-700 rounded-md p-6 bg-[#0d1117]">
      <div className="text-sm text-gray-400 mb-3">vinterfjard / README.md</div>

      <h2 className="text-2xl font-bold mb-4">
        Hi there <span className="animate-wave inline-block">👋</span>
      </h2>

      <p className="text-xl mb-6">
        I'm <span className="font-bold">Dennis Vinterfjärd</span>, a Head of Engineering currently at MedHelp Care in
        Stockholm.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="https://vinterfjard.com"
          className="flex items-center px-3 py-1 bg-purple-900/50 text-purple-300 rounded-md text-sm hover:bg-purple-800/50 transition-colors"
        >
          <span className="mr-2">🌐</span> vinterfjard.com
        </Link>

        <div className="flex items-center px-3 py-1 bg-yellow-900/30 text-yellow-300 rounded-md text-sm">
          <span className="mr-2">JS</span> JavaScript
        </div>

        <div className="flex items-center px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-sm">
          <span className="mr-2">TS</span> TypeScript
        </div>

        <div className="flex items-center px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
          <span className="mr-2">𝕏</span> Follow @dennisvinterfjard
        </div>
      </div>

      <blockquote className="border-l-4 border-gray-700 pl-4 py-1 text-gray-300 italic">
        With a background as a Senior Engineer at Klarna and System Owner at Tele2, I have a strong foundation in
        leading development processes, driving continuous improvements in tech stacks and methodologies, and fostering
        team growth and knowledge sharing.
      </blockquote>
    </div>
  )
}
