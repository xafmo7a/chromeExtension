import React from 'react';
import { ClipboardList, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Header = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">Stepify</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500">Simplify your tasks</p>
          <button
            onClick={handleSignOut}
            className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};