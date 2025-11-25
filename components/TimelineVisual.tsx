import React from 'react';

const TimelineVisual: React.FC = () => {
  return (
    <div className="w-full bg-hub-gray/30 rounded-xl p-6 border border-white/10 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-hub-yellow pl-3">
        Linha do Tempo Visual
      </h3>
      
      <div className="relative w-full overflow-x-auto pb-4">
        <div className="min-w-[600px] flex flex-col gap-8">
          
          {/* Calendar Header */}
          <div className="flex w-full mb-2">
            <div className="w-1/2 bg-zinc-800/50 p-2 text-center text-xs text-gray-400 uppercase tracking-widest rounded-l-lg border-r border-zinc-700">
              Mês de Trabalho (M)
            </div>
            <div className="w-1/2 bg-zinc-800/50 p-2 text-center text-xs text-gray-400 uppercase tracking-widest rounded-r-lg">
              Mês Seguinte (M+1)
            </div>
          </div>

          {/* HOTELS */}
          <div className="relative group">
            <div className="flex items-center mb-2">
              <span className="text-sm font-bold w-24 text-blue-400">Hotéis</span>
            </div>
            <div className="h-10 w-full bg-zinc-900 rounded-full relative flex items-center">
              {/* Work Period */}
              <div className="absolute left-0 w-1/2 h-full bg-blue-900/40 rounded-l-full border border-blue-500/30 flex items-center justify-center">
                <span className="text-xs text-blue-200 font-medium">Trabalho: 01-31</span>
              </div>
              {/* Connection Line */}
              <div className="absolute left-[50%] w-[4%] h-[2px] bg-blue-500"></div>
              {/* Payment Point */}
              <div className="absolute left-[54%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                 <span className="absolute top-6 text-xs font-bold text-blue-400 whitespace-nowrap">Dia 03</span>
              </div>
            </div>
          </div>

          {/* WT */}
          <div className="relative group">
             <div className="flex items-center mb-2">
              <span className="text-sm font-bold w-24 text-hub-yellow">WT</span>
            </div>
            {/* Cycle 1 */}
            <div className="h-10 w-full bg-zinc-900 rounded-full relative flex items-center mb-2">
               <div className="absolute left-0 w-[25%] h-full bg-yellow-900/30 rounded-l-full border border-yellow-500/30 flex items-center justify-center">
                <span className="text-[10px] text-yellow-200 font-medium">01-15</span>
              </div>
              <div className="absolute left-[25%] w-[15%] h-[2px] bg-hub-yellow border-t border-dashed border-yellow-200 opacity-50"></div>
              <div className="absolute left-[40%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-4 h-4 rounded-full bg-hub-yellow shadow-[0_0_10px_rgba(255,204,0,0.6)]"></div>
                 <span className="absolute top-6 text-xs font-bold text-hub-yellow whitespace-nowrap">Dia 25 (Atual)</span>
              </div>
            </div>
            {/* Cycle 2 */}
            <div className="h-10 w-full bg-zinc-900 rounded-full relative flex items-center">
               <div className="absolute left-[25%] w-[25%] h-full bg-yellow-900/30 border border-yellow-500/30 flex items-center justify-center">
                <span className="text-[10px] text-yellow-200 font-medium">16-31</span>
              </div>
              <div className="absolute left-[50%] w-[16%] h-[2px] bg-hub-yellow border-t border-dashed border-yellow-200 opacity-50"></div>
              <div className="absolute left-[66%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-4 h-4 rounded-full bg-hub-yellow shadow-[0_0_10px_rgba(255,204,0,0.6)]"></div>
                 <span className="absolute top-6 text-xs font-bold text-hub-yellow whitespace-nowrap">Dia 10 (Prox.)</span>
              </div>
            </div>
          </div>

           {/* Talixo */}
           <div className="relative group">
             <div className="flex items-center mb-2">
              <span className="text-sm font-bold w-24 text-emerald-400">Talixo</span>
            </div>
            {/* Cycle 1 */}
            <div className="h-10 w-full bg-zinc-900 rounded-full relative flex items-center mb-2">
               <div className="absolute left-0 w-[25%] h-full bg-emerald-900/30 rounded-l-full border border-emerald-500/30 flex items-center justify-center">
                <span className="text-[10px] text-emerald-200 font-medium">01-15</span>
              </div>
              <div className="absolute left-[25%] w-[41%] h-[2px] bg-emerald-600 border-t border-dashed border-emerald-400 opacity-50"></div>
              <div className="absolute left-[66%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                 <span className="absolute top-6 text-xs font-bold text-emerald-400 whitespace-nowrap">Dia 10 (Prox.)</span>
              </div>
            </div>
            {/* Cycle 2 */}
            <div className="h-10 w-full bg-zinc-900 rounded-full relative flex items-center">
               <div className="absolute left-[25%] w-[25%] h-full bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-[10px] text-emerald-200 font-medium">16-31</span>
              </div>
              <div className="absolute left-[50%] w-[42%] h-[2px] bg-emerald-600 border-t border-dashed border-emerald-400 opacity-50"></div>
              <div className="absolute left-[92%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-12 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                 <span className="absolute top-6 text-xs font-bold text-emerald-400 whitespace-nowrap">25-28 (Prox.)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <p className="text-xs text-gray-500 mt-8 text-center italic">* Gráfico ilustrativo das janelas de pagamento.</p>
    </div>
  );
};

export default TimelineVisual;