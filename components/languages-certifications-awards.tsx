'use client';

import { useState } from 'react';
import { Languages, Award, Trophy } from 'lucide-react';
import { Modal } from './ui/modal';

interface LanguageItemProps {
  language: string;
  level: string;
  isNative?: boolean;
}

function LanguageItem({ language, level, isNative }: LanguageItemProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span>{language}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          isNative ? 'bg-blue-900 text-blue-300' : 'bg-blue-800 text-blue-200'
        }`}
      >
        {level}
      </span>
    </div>
  );
}

export default function LanguagesCertificationsAwards() {
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Languages */}
      <div>
        <div className="mb-4 flex items-center">
          <Languages className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-medium">Languages</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <LanguageItem language="Swedish" level="Native" isNative={true} />
          <LanguageItem language="English" level="Proficient" />
        </div>
      </div>

      {/* Certification */}
      <div>
        <div className="mb-4 flex items-center">
          <Award className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-medium">Certification</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <div className="mb-2">
            <div className="font-medium">Leadership in Complexity</div>
            <div className="text-sm text-gray-400">IERO Leadership Development</div>
          </div>
        </div>
      </div>

      {/* Awards */}
      <div>
        <div className="mb-4 flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-medium">Awards</h2>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <div className="mb-3">
            <button
              onClick={() => setIsAwardModalOpen(true)}
              className="cursor-pointer border-none bg-transparent p-0 text-left font-normal text-blue-400 hover:underline"
            >
              2023 Newcomer of the Year
            </button>
          </div>
          <div className="mb-2">
            <button
              onClick={() => setIsNominationModalOpen(true)}
              className="cursor-pointer border-none bg-transparent p-0 text-left font-normal text-blue-400 hover:underline"
            >
              2017 Employee of the Year Nomination
            </button>
          </div>
        </div>
      </div>

      {/* Award Modal */}
      <Modal
        isOpen={isAwardModalOpen}
        onClose={() => setIsAwardModalOpen(false)}
        title="2023 Newcomer of the Year - MedHelp Care"
      >
        <div className="text-gray-300">
          <h3 className="mb-3 text-lg font-medium text-blue-300">Award Motivation</h3>
          <p className="mb-4 border-l-4 border-blue-800 bg-gray-800/30 py-2 pl-4 italic">
            &ldquo;With great dedication and energy, he entered and immersed himself in our
            environment and challenges, taking a proactive role in improving the platform with new
            functionality as well as ensuring performance in current services. With a methodical
            approach and a commitment to doing things the right way and promoting the development of
            long-term effective solutions, he has significantly contributed to reshaping not only
            our technical platform but also our processes, introducing a culture of continuous
            improvement and innovation. Additionally, through responsiveness and open communication,
            he has aligned all colleagues in the same direction and created a sense of belonging by
            leading by example&rdquo;
          </p>
        </div>
      </Modal>

      {/* Nomination Modal */}
      <Modal
        isOpen={isNominationModalOpen}
        onClose={() => setIsNominationModalOpen(false)}
        title="2017 Employee of the Year Nomination - Tele2"
      >
        <div className="text-gray-300">
          <h3 className="mb-3 text-lg font-medium text-blue-300">Nomination Motivation</h3>
          <p className="mb-4 border-l-4 border-blue-800 bg-gray-800/30 py-2 pl-4 italic">
            &ldquo;Dennis&apos; deep technical skills at the forefront of the technology evolution
            never cease to impress. With a drive and a mentality that show that nothing is
            impossible, Dennis is constantly working to drive efficiencies, by e.g. replacing manual
            work with automation but never without clear benefits for our customers or efficiency.
            Dennis has a flexible mindset and constantly strives to find the best solutions, making
            him a true digital role model. Dennis will quickly break apart, analyze and present a
            solution to any complex situation in front of him, no matter what comes his way.&rdquo;
          </p>
        </div>
      </Modal>
    </div>
  );
}
