import React, { useState } from 'react';
import { Check, ClipboardCopy, CheckSquare as SquareCheck, Square } from 'lucide-react';

interface StepsListProps {
  steps: string[];
}

export const StepsList = ({ steps }: StepsListProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggleStep = (index: number) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(index)) {
      newCompletedSteps.delete(index);
    } else {
      newCompletedSteps.add(index);
    }
    setCompletedSteps(newCompletedSteps);
  };

  const handleCopyToClipboard = () => {
    const formattedSteps = steps.map((step, index) => {
      return `- ${step}`;
    }).join('\n');
    
    navigator.clipboard.writeText(formattedSteps).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Your Steps</h2>
        <button 
          onClick={handleCopyToClipboard}
          className="text-gray-500 hover:text-blue-500 flex items-center space-x-1 text-sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {steps.map((step, index) => (
          <li 
            key={index}
            className="p-4 flex items-start gap-3 hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            <button 
              onClick={() => toggleStep(index)}
              className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-blue-500 focus:outline-none"
            >
              {completedSteps.has(index) ? (
                <SquareCheck className="h-5 w-5 text-blue-500" />
              ) : (
                <Square className="h-5 w-5" />
              )}
            </button>
            <span 
              className={`${
                completedSteps.has(index) 
                  ? 'text-gray-400 line-through' 
                  : 'text-gray-700'
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};