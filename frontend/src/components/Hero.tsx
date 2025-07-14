
import { useEffect, useState } from 'react';
import { ArrowDown, Play, Edit3 } from 'lucide-react';
import { Hero3DElements } from './Hero3DElements';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-green-400 text-lg font-semibold">
                  <Edit3 size={24} />
                  <span className="tracking-wider">PROFESSIONAL VIDEO EDITING</span>
                </div>
                
                {/* Neon-style main heading */}
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-wider">
                    <span className="block text-green-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] font-extrabold">
                      SCULPTING
                    </span>
                    <span className="block text-white font-extrabold">YOUR</span>
                    <span className="block text-white font-extrabold">VISION INTO</span>
                    <span className="block text-green-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] font-extrabold">
                      REALITY
                    </span>
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
                  Professional video editing services that transform your raw footage into cinematic masterpieces. Where creativity meets technical excellence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group border-2 border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 rounded-none font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 backdrop-blur-sm"
                  >
                    <span className="tracking-wider">VIEW WORK</span>
                  </button>
                  
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-none font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25"
                  >
                    <span className="tracking-wider">GET IN TOUCH</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-green-500/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">50+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - 3D Neon Cube */}
          <div className={`relative h-[600px] flex items-center justify-center transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* 3D Neon Cube Container */}
            <div className="relative">
              {/* Main Cube with Neon Effect */}
              <div className="w-64 h-64 relative transform rotate-12 hover:rotate-6 transition-transform duration-700">
                {/* Cube faces with neon glow */}
                <div className="absolute inset-0 border-2 border-green-400 bg-black/20 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.8),inset_0_0_50px_rgba(16,185,129,0.2)]">
                  {/* Video play icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-green-400 flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                      <Play className="text-green-400 ml-1" size={32} />
                    </div>
                  </div>
                </div>
                
                {/* 3D depth effect */}
                <div className="absolute top-[-12px] left-[12px] w-64 h-64 border-2 border-green-400/60 bg-black/10 -z-10 shadow-[0_0_30px_rgba(16,185,129,0.4)]"></div>
                <div className="absolute top-[-24px] left-[24px] w-64 h-64 border-2 border-green-400/30 bg-black/5 -z-20 shadow-[0_0_20px_rgba(16,185,129,0.2)]"></div>
              </div>
              
              {/* Floating particles around cube */}
              <div className="absolute -top-4 -right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <div className="absolute -bottom-6 -left-6 w-3 h-3 border border-green-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
              <div className="absolute top-1/2 -right-8 w-1 h-6 bg-green-400/60 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div className="absolute -top-8 left-1/2 w-4 h-1 bg-green-400/40 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            </div>
            
            {/* Background subtle 3D elements */}
            <div className="absolute inset-0 opacity-30">
              <Hero3DElements />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-green-400" size={32} />
      </div>
    </section>
  );
};
