import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowRight, DollarSign } from 'lucide-react';
import { calculatePaymentDate } from '../constants';

const Calculator: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const paymentDates = calculatePaymentDate(selectedDay);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-hub-yellow/20 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-hub-yellow rounded-lg">
          <CalendarIcon className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Calculadora de Recebimento</h3>
          <p className="text-sm text-gray-400">Simule uma data de trabalho</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
          <span>Dia 1</span>
          <span className="text-hub-yellow font-bold text-lg">Dia {selectedDay}</span>
          <span>Dia 31</span>
        </div>
        <input
          type="range"
          min="1"
          max="31"
          value={selectedDay}
          onChange={handleSliderChange}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-hub-yellow focus:outline-none focus:ring-2 focus:ring-hub-yellow/50"
        />
        <p className="text-xs text-center mt-2 text-gray-500">Arraste para selecionar o dia do serviço</p>
      </div>

      <div className="space-y-4">
        {paymentDates.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-white/5 hover:border-hub-yellow/30 transition-all duration-300"
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">{item.operator}</span>
              <span className="text-sm font-medium text-white">Trabalho dia <span className="text-hub-yellow">{selectedDay}</span></span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-gray-600 mx-2" />
            
            <div className="flex flex-col items-end">
              <span className={`text-xs uppercase font-bold tracking-wider mb-1 ${
                item.status === 'current-month' ? 'text-green-400' : 'text-blue-400'
              }`}>
                {item.status === 'current-month' ? 'Recebe Rápido' : 'Recebe Depois'}
              </span>
              <span className="text-sm font-bold text-white text-right">{item.payment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;