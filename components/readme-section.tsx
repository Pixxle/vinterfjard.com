import { Mail, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function ReadmeSection() {
  return (
    <div className="mb-8 rounded-md border border-gray-700 bg-[#0d1117] p-6">
      <div className="mb-3 text-sm text-gray-400">vinterfjard / README.md</div>

      <h1 className="mb-2 text-2xl font-bold">
        Hi there, I&apos;m Dennis Vinterfjärd <span className="animate-wave inline-block">👋</span>
      </h1>

      <p className="mb-6">
        I&apos;m currently the Head of Engineering at Medhelp Care, based in Stockholm. I&apos;m
        passionate about building great engineering cultures, driving technical excellence, and
        sharing knowledge along the way.
      </p>

      <div className="my-6 border-t border-b border-gray-700 py-4">
        <div className="mb-1 flex flex-wrap gap-2">
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

      <p className="mb-4 text-gray-300">
        If you&apos;re working on something interesting, want to collaborate, or just want to talk
        tech—feel free to reach out!
      </p>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-gray-400" />
          <strong className="mr-2">Email:</strong>
          <a href="mailto:dennis@vinterfjard.com" className="text-blue-400 hover:underline">
            dennis@vinterfjard.com
          </a>
        </div>
        <div className="flex items-center">
          <Linkedin className="mr-2 h-4 w-4 text-gray-400" />
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
