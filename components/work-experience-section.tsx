'use client';

import { useState } from 'react';
import WorkHistoryCard from './work-history-card';
import { Modal } from './ui/modal';

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'Current' | 'Past';
  companyColor?: string;
  detailedDescription: string;
}

export default function WorkExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);

  const workExperiences: WorkExperience[] = [
    {
      id: 'medhelp',
      title: 'Head of Engineering',
      company: 'MedHelp Care',
      startDate: '03/2023',
      endDate: 'Present',
      status: 'Current',
      companyColor: '#3178c6', // Blue color
      detailedDescription:
        'As Head of Engineering, I lead development and delivery processes, drive continuous improvements in the tech stack and work methodologies, and ensure my team has the tools and support needed to excel. I manage knowledge sharing, oversee employee development, and collaborate closely with the CTO and product teams, as well as Customer Success, Sales, and Marketing.',
    },
    {
      id: 'klarna-go',
      title: 'Go Technical Community Lead',
      company: 'Klarna',
      startDate: '05/2022',
      endDate: '03/2023',
      status: 'Past',
      companyColor: '#00ADD8', // Go blue color
      detailedDescription:
        'In this role, I championed the adoption of the Go development language within Klarna. After contributing to a report on its benefits, I was elected Community Lead, fostering Go usage through internal tooling, documentation, and regular meetings with users.',
    },
    {
      id: 'klarna-cloud',
      title: 'Senior Engineer, Cloud Protection',
      company: 'Klarna',
      startDate: '06/2020',
      endDate: '03/2023',
      status: 'Past',
      companyColor: '#00ADD8', // Go blue color
      detailedDescription:
        'As a Senior Engineer in Cloud Protection, I focused on designing and building products and automated security tooling. My work empowered other Klarna engineers to create products that are secure by default.',
    },
    {
      id: 'klarna-financial',
      title: 'Senior Engineer, Financial Platform Operations',
      company: 'Klarna',
      startDate: '09/2018',
      endDate: '06/2020',
      status: 'Past',
      companyColor: '#00ADD8', // Go blue color
      detailedDescription:
        'I designed and developed integrations between Klarna and external vendors, and created automated solutions for processing records using technologies like Kafka. My responsibilities included extensive automation of platform aspects using tools such as Terraform, CloudFormation, and Ansible, and providing technical expertise to support various projects.',
    },
    {
      id: 'tele2-system-owner',
      title: 'System Owner, Transaction Systems',
      company: 'Tele2',
      startDate: '08/2017',
      endDate: '08/2018',
      status: 'Past',
      companyColor: '#E50914', // Red color for Tele2
      detailedDescription:
        "As System Owner for Tele2's provisioning platform, I led the team's daily activities, provided technical expertise for new projects, planned financial requirements, and ensured effective, goal-oriented teamwork. I was nominated for the 2017 Tele2 Employee of the Year for my technical skills and drive for efficiency through automation.",
    },
    {
      id: 'tele2-sysadmin',
      title: 'System administrator, Transaction Systems',
      company: 'Tele2',
      startDate: '04/2016',
      endDate: '08/2017',
      status: 'Past',
      companyColor: '#E50914', // Red color for Tele2
      detailedDescription:
        "I was responsible for the system administration of Tele2's provisioning platform. This included troubleshooting network issues, managing load balancing and JBoss software, developing more effective monitoring systems, managing Linux servers, and maintaining security policies. I also participated in new projects within Tele2.",
    },
    {
      id: 'tele2-network',
      title: 'Network technician, Data Network Operation Center',
      company: 'Tele2',
      startDate: '12/2014',
      endDate: '04/2016',
      status: 'Past',
      companyColor: '#E50914', // Red color for Tele2
      detailedDescription:
        "In this role, I managed and monitored Tele2's Data Network. My duties involved managing network alarms, handling problem tickets for private and enterprise customer networks, and addressing internal network issues. I gained experience with a variety of switching and routing equipment from Cisco, Huawei, and Juniper.",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-medium">Work Experience</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {workExperiences.map(experience => (
          <WorkHistoryCard
            key={experience.id}
            title={experience.title}
            company={experience.company}
            startDate={experience.startDate}
            endDate={experience.endDate}
            status={experience.status}
            companyColor={experience.companyColor}
            onClick={() => setSelectedExperience(experience)}
          />
        ))}
      </div>

      {selectedExperience && (
        <Modal
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
          title={`${selectedExperience.title} | ${selectedExperience.company} (${selectedExperience.startDate} - ${selectedExperience.endDate})`}
        >
          <div className="text-gray-300">
            <p className="mb-4">{selectedExperience.detailedDescription}</p>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedExperience.companyColor }}
              ></span>
              <span className="text-gray-300">{selectedExperience.company}</span>
              <span className="ml-auto text-gray-400">
                {selectedExperience.startDate} - {selectedExperience.endDate}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
