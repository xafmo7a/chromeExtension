import React, { useEffect, useState } from 'react';
import { Highlighter, ArrowRightCircle } from 'lucide-react';

interface TextSelectorProps {
  onSelectionChange: (text: string) => void;
  onProcess: () => void;
  selectedText: string;
}

export const TextSelector = ({ 
  onSelectionChange, 
  onProcess,
  selectedText 
}: TextSelectorProps) => {
  // Example text that users can highlight
  const exampleText = `Task: Create a project plan for the new website redesign.
  
For this task, you will need to analyze requirements, create wireframes, develop content strategy, and coordinate with stakeholders. Make sure to include timeline estimates and resource allocations. The redesign should focus on improving user experience and increasing conversion rates.`;

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        onSelectionChange(selection.toString());
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [onSelectionChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <Highlighter className="h-4 w-4" />
        <p>Highlight text to convert it into steps</p>
      </div>
      
      <div 
        className="p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 min-h-[200px]"
      >
        {exampleText}
      </div>
      
      {selectedText && (
        <div className="p-4 bg-blue-50 rounded border border-blue-200 text-gray-700">
          <p className="text-sm font-medium text-blue-700 mb-2">Selected Text:</p>
          <p className="text-gray-700">{selectedText}</p>
        </div>
      )}
      
      <button
        onClick={onProcess}
        disabled={!selectedText}
        className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 
          ${selectedText ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} 
          transition duration-150 ease-in-out`}
      >
        <span>Convert to Steps</span>
        <ArrowRightCircle className="h-4 w-4" />
      </button>
    </div>
  );
};