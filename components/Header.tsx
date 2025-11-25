import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-hub-black border-b border-hub-gray py-6 px-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Emulation based on Hub Transfer style */}
        <div className="flex flex-col items-center md:items-start select-none">
          <div className="border-2 border-hub-yellow rounded-md px-4 py-0.5 mb-1">
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-hub-yellow rounded-full"></div>
              <div className="w-8 h-1 bg-hub-yellow rounded-full"></div>
              <div className="w-8 h-1 bg-hub-yellow rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
            HUB<span className="text-hub-yellow">TRANSFER</span>
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-hub-yellow uppercase mt-1">
            Transfer and Tourism
          </p>
        </div>
        
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold text-white">Portal do Motorista</h2>
          <p className="text-sm text-gray-400">Guia de Pagamentos & Comissões</p>
        </div>
      </div>
    </header>
  );
};

export default Header;