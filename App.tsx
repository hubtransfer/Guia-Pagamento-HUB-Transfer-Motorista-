import React, { useRef, useState } from 'react';
import Header from './components/Header';
import TimelineVisual from './components/TimelineVisual';
import Calculator from './components/Calculator';
import { PAYMENT_RULES } from './constants';
import { Info, CheckCircle2, FileDown, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current || !window.html2canvas || !window.jspdf || isGenerating) return;

    setIsGenerating(true);

    try {
      const { jsPDF } = window.jspdf;
      
      const element = contentRef.current;
      const scrollHeight = element.scrollHeight;

      // Capture settings
      // We use 900px width to match the max-w-4xl (~896px) content width.
      // This creates a tall, document-like aspect ratio that fills an A4 page much better
      // than a wide desktop capture.
      const canvas = await window.html2canvas(element, {
        backgroundColor: '#000000',
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        windowWidth: 900, 
        height: scrollHeight + 150, // Extra buffer
        windowHeight: scrollHeight + 150,
        onclone: (clonedDoc: Document) => {
            // 1. Force Black Background
            const wrapper = clonedDoc.getElementById('capture-container');
            if (wrapper) {
                wrapper.style.backgroundColor = '#000000';
                wrapper.style.height = 'auto';
                wrapper.style.minHeight = '100vh';
                wrapper.style.overflow = 'visible';
            }

            // 2. Expand Containers to fit the 900px capture window perfectly
            const containers = clonedDoc.querySelectorAll('.max-w-4xl');
            containers.forEach((el: any) => {
                el.classList.remove('max-w-4xl');
                el.classList.remove('mx-auto');
                el.style.maxWidth = '100%';
                el.style.width = '100%';
                el.style.paddingLeft = '40px'; 
                el.style.paddingRight = '40px';
            });

            // 3. Add vertical breathing room to fill the page height
            // We select direct children sections of the main container to add spacing
            const main = clonedDoc.querySelector('main');
            if (main) {
                main.style.gap = '3rem'; // Increase gap from space-y-12 (3rem) to bigger if needed, but 3rem is good with the margins below
                
                const sections = main.querySelectorAll('section');
                sections.forEach((section: any) => {
                    section.style.marginBottom = '40px'; // Force extra spacing
                });
            }

            // Adjust Header specifically
            const headerDiv = clonedDoc.querySelector('header > div');
            if (headerDiv) {
                (headerDiv as HTMLElement).style.maxWidth = '100%';
            }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions in mm (Portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      
      // Fill page with black background
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      
      // Calculate dimensions to fit within A4
      let printWidth = pdfWidth;
      let printHeight = pdfWidth / imgRatio;

      // If the image is STILL taller than the page (unlikely with 900px width unless content is huge), scale it down
      if (printHeight > pdfHeight) {
        printHeight = pdfHeight;
        printWidth = printHeight * imgRatio;
      }

      // Center the image on the page
      const xOffset = (pdfWidth - printWidth) / 2;
      const yOffset = (pdfHeight - printHeight) / 2;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, printWidth, printHeight);
      
      // Save
      pdf.save(`hub-transfer-guia-pagamentos-${new Date().toISOString().slice(0,10)}.pdf`);

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Não foi possível gerar o PDF automaticamente. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-20 font-sans relative">
      {/* Content Wrapper for Capture - ID added for logic targeting */}
      <div ref={contentRef} id="capture-container" className="bg-black pb-10">
        <Header />

        <main className="max-w-4xl mx-auto px-4 pt-8 space-y-12">
          
          {/* Intro Text */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ciclos de <span className="text-hub-yellow">Pagamento</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Entenda de forma simples e transparente quando você receberá suas comissões de cada operadora parceira da Hub Transfer.
            </p>
          </section>

          {/* Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAYMENT_RULES.map((rule) => {
              const Icon = rule.icon;
              return (
                <div key={rule.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-hub-yellow/50 transition-colors duration-300 relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity`}>
                     <Icon className="w-24 h-24 text-white" />
                   </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                     <div className={`p-2 rounded-lg ${rule.id === 'wt' ? 'bg-hub-yellow text-black' : 'bg-zinc-800 text-white'}`}>
                       <Icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold">{rule.operator}</h3>
                  </div>

                  <div className="space-y-4 flex-grow">
                     <div>
                       <p className="text-xs text-gray-500 uppercase tracking-wider">Período de Trabalho</p>
                       <p className="font-semibold text-white">{rule.workPeriod}</p>
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 uppercase tracking-wider">Data do Pagamento</p>
                       <p className={`font-bold ${rule.id === 'wt' ? 'text-hub-yellow' : 'text-blue-400'}`}>
                         {rule.paymentDateDescription}
                       </p>
                     </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 text-sm text-gray-400 flex gap-2 items-start">
                    <Info className="w-4 h-4 min-w-[1rem] mt-0.5" />
                    <p>{rule.details}</p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Interactive Tools Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Calculator />
             <div className="flex flex-col justify-center">
               <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <CheckCircle2 className="text-hub-yellow w-5 h-5"/> Destaques
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                      <span><strong>Hotéis</strong> pagam de uma vez só, sempre no início do mês seguinte.</span>
                    </li>
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-hub-yellow mt-2"></span>
                      <span><strong>World Transfer (WT)</strong> tem o melhor fluxo de caixa: trabalhou na primeira quinzena, recebe no dia 25 do mesmo mês.</span>
                    </li>
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
                      <span><strong>Talixo</strong> sempre paga no mês seguinte, com a segunda quinzena sendo paga mais para o fim do mês (25-28).</span>
                    </li>
                  </ul>
               </div>
               <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-hub-yellow text-sm text-center font-medium">
                    Dúvidas sobre o valor? Entre em contato com o financeiro.
                  </p>
               </div>
             </div>
          </section>

          {/* Visual Timeline Section */}
          <section>
            <TimelineVisual />
          </section>

        </main>

        <footer className="max-w-4xl mx-auto mt-16 px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Hub Transfer - Todos os direitos reservados.</p>
        </footer>
      </div>

      {/* Floating Download Button */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <button 
          onClick={handleDownload}
          disabled={isGenerating}
          className="bg-hub-yellow text-black font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(255,204,0,0.3)] flex items-center gap-2 hover:bg-yellow-400 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gerando PDF...
            </>
          ) : (
            <>
              <FileDown className="w-5 h-5" />
              Baixar em PDF (A4)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;