import React, { useState } from 'react';
import { ArrowRightCircle, Loader2 } from 'lucide-react';

interface TextInputProps {
  onProcess: (text: string) => void;
  loading?: boolean;
}

export const TextInput = ({ onProcess, loading }: TextInputProps) => {
  const [inputText, setInputText] = useState('');

  const handleProcess = () => {
    onProcess(inputText);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-3 min-h-[200px] rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
        placeholder="Enter your text here... (e.g., project instructions, assignment details)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={loading}
      />
      
      <button
        onClick={handleProcess}
        disabled={!inputText.trim() || loading}
        className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 
          ${inputText.trim() && !loading ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} 
          transition duration-150 ease-in-out`}
      >
        <span>{loading ? 'Processing...' : 'Convert to Steps'}</span>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRightCircle className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};