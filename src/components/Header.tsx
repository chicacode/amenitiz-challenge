import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-zinc-50 border-b shadow-sm py-4 px-6 sticky top-0 z-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">Wiki Chess Grand Masters</h1>
        <p className="text-sm text-gray-500">Chess.com Wikipedia page</p>
      </div>
    </header>
  );
};

export default Header;
