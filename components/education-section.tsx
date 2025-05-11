import { BookOpen } from "lucide-react";

export default function EducationSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <BookOpen className="w-5 h-5 mr-2" />
        <h2 className="text-xl font-medium">Education</h2>
      </div>

      <div className="border border-gray-700 rounded-md p-4 bg-[#0d1117]">
        <div className="flex items-start">
          <div className="mt-1 mr-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Computer science</h3>
            Mälardalen University
            <div className="text-gray-400 text-sm mt-1">01/2010 - 01/2014</div>
          </div>
        </div>
      </div>
    </div>
  );
}
