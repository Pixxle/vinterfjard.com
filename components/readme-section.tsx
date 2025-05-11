import { Terminal } from "lucide-react"
import Image from "next/image"

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
        <div className="flex items-center px-3 py-1 bg-yellow-900/30 text-yellow-300 rounded-md text-sm">
          <span className="mr-2 text-lg">𝙅𝙎</span> JavaScript
        </div>

        <div className="flex items-center px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-sm">
          <span className="mr-2 text-lg">𝙏𝙎</span> TypeScript
        </div>

        <div className="flex items-center px-3 py-1 bg-teal-900/30 text-teal-300 rounded-md text-sm">
          <Image src="/images/go-logo.png" alt="Go Logo" width={16} height={16} className="mr-2" />
          Go
        </div>

        <div className="flex items-center px-3 py-1 bg-orange-900/30 text-orange-300 rounded-md text-sm">
          <div className="bg-white rounded-full p-0.5 mr-2">
            <Image src="/images/rust-logo.png" alt="Rust Logo" width={14} height={14} className="block" />
          </div>
          Rust
        </div>

        <div className="flex items-center px-3 py-1 bg-purple-900/30 text-purple-300 rounded-md text-sm">
          <Image src="/images/csharp-logo-simple.png" alt="C# Logo" width={20} height={20} className="mr-2" />
          C#
        </div>

        <div className="flex items-center px-3 py-1 bg-blue-900/30 text-yellow-300 rounded-md text-sm">
          <Image src="/images/python-logo.png" alt="Python Logo" width={16} height={16} className="mr-2" />
          Python
        </div>

        <div className="flex items-center px-3 py-1 bg-green-900/30 text-green-300 rounded-md text-sm">
          <Terminal className="w-4 h-4 mr-2" /> Bash
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
