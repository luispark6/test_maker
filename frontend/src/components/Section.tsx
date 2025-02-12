import React from 'react';

type SectionProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, description, icon }) => (
  <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start space-x-6">
      {icon && (
        <div className="flex-shrink-0 p-4 rounded-lg bg-blue-50">
          <div className="text-blue-600 w-8 h-8">
            {icon}
          </div>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default Section;