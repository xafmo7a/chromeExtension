import React, { useState } from 'react';
import { StepsList } from './StepsList';
import { TextInput } from './TextInput';
import { processTextToSteps } from '../utils/textProcessing';

export const TextProcessor = () => {
  const [steps, setSteps] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleProcessText = async (text: string) => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const generatedSteps = await processTextToSteps(text);
      setSteps(generatedSteps);
    } catch (err) {
      setError('Failed to process text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full p-4 text-left text-gray-700 hover:bg-gray-50 flex items-center justify-between"
          >
            <span>Click to expand text input</span>
            <span className="text-blue-500">↓</span>
          </button>
        ) : (
          <div className="p-4">
            <TextInput onProcess={handleProcessText} loading={loading} />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-600">
          {error}
        </div>
      )}

      {steps.length > 0 && (
        <StepsList steps={steps} />
      )}
    </div>
  );
};