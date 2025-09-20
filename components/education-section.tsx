import { BookOpen } from 'lucide-react';

export default function EducationSection() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        <BookOpen className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-medium">Education</h2>
      </div>

      <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4">
        <div className="flex items-start">
          <div className="mt-1 mr-3">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Computer science</h3>
            Mälardalen University
            <div className="mt-1 text-sm text-gray-400">01/2010 - 01/2014</div>
          </div>
        </div>
      </div>
    </div>
  );
}
