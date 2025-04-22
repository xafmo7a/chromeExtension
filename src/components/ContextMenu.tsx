import React, { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface ContextMenuProps {
  onConvertToSteps: (text: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ onConvertToSteps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (text) {
        setSelectedText(text);
        setPosition({ x: e.pageX, y: e.pageY });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleClick = () => setIsVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
        onClick={() => {
          onConvertToSteps(selectedText);
          setIsVisible(false);
        }}
      >
        <ClipboardList className="h-4 w-4" />
        <span>Convert to Steps</span>
      </button>
    </div>
  );
};