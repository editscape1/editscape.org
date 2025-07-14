import React from 'react';
import { MessageSquare, FileVideo, Zap, ArrowUp } from 'lucide-react';
const processSteps = [{
  icon: MessageSquare,
  title: 'Consultation',
  description: 'We begin by understanding your vision, goals, and target audience to create a tailored editing approach.'
}, {
  icon: FileVideo,
  title: 'Planning',
  description: 'We develop a comprehensive editing strategy, including style, pacing, and technical requirements.'
}, {
  icon: Zap,
  title: 'Execution',
  description: 'Our expert editors bring your vision to life with precision cutting, color grading, and sound design.'
}, {
  icon: ArrowUp,
  title: 'Refinement',
  description: 'We collaborate with you through revisions to ensure the final product exceeds your expectations.'
}];
export const Process = () => {
  return <section id="process" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider mb-8">
            OUR <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">PROCESS</span>
          </h2>
          <div className="w-32 h-1 bg-green-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A streamlined workflow designed to deliver exceptional results through collaboration and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => <div key={index} className="relative">
              <div className="bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 text-left hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative overflow-hidden h-full group">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Step number with overlapping green circle */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-black font-black text-2xl shadow-[0_0_40px_rgba(16,185,129,0.8)] border-4 border-black z-20 group-hover:scale-110 transition-transform duration-300 mx-[8px] my-[7px]">
                  {index + 1}
                </div>
                
                <div className="relative z-10 pt-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 border-2 border-green-400 rounded-full mb-6">
                    <step.icon className="w-8 h-8 text-white group-hover:scale-x-[-1] transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-4 tracking-wider">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Connection line */}
              {index < processSteps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-500/40 transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
};