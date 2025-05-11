import { Mail, Linkedin } from "lucide-react";
import Image from "next/image";

export default function ReadmeSection() {
  return (
    <div className="mb-8 border border-gray-700 rounded-md p-6 bg-[#0d1117]">
      <div className="text-sm text-gray-400 mb-3">vinterfjard / README.md</div>

      <h1 className="text-2xl font-bold mb-2">
        Hi there, I&apos;m Dennis Vinterfjärd{" "}
        <span className="animate-wave inline-block">👋</span>
      </h1>

      <p className="mb-6">
        I&apos;m currently Head of Engineering at Medhelp Care, based in
        Stockholm. I&apos;m passionate about building great engineering
        cultures, driving technical excellence, and sharing knowledge along the
        way.
      </p>

      <div className="border-t border-b border-gray-700 py-4 my-6">
        <div className="flex flex-wrap gap-2 mb-1">
          <Image
            src="/images/badges/javascript.svg"
            alt="JavaScript"
            width={126}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/typescript.svg"
            alt="TypeScript"
            width={126}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/go.svg"
            alt="Go"
            width={62}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/python.svg"
            alt="Python"
            width={97}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/rust.svg"
            alt="Rust"
            width={78}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/csharp.svg"
            alt="C#"
            width={41}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/images/badges/bash.svg"
            alt="Bash"
            width={79}
            height={28}
            className="h-7 w-auto"
          />
        </div>
      </div>

      <p className="text-gray-300 mb-4">
        If you&apos;re working on something interesting, want to collaborate, or
        just want to talk tech—feel free to reach out!
      </p>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <strong className="mr-2">Email:</strong>
          <a
            href="mailto:dennis@vinterfjard.com"
            className="text-blue-400 hover:underline"
          >
            dennis@vinterfjard.com
          </a>
        </div>
        <div className="flex items-center">
          <Linkedin className="w-4 h-4 mr-2 text-gray-400" />
          <strong className="mr-2">LinkedIn:</strong>
          <a
            href="https://linkedin.com/in/dennis-vinterfjärd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            linkedin.com/in/dennis-vinterfjärd
          </a>
        </div>
      </div>
    </div>
  );
}
