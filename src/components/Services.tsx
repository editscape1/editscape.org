
import React from 'react';
import { Video, Film, Palette, FileVideo, Volume2, Zap, Image } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Commercial Editing',
    description: 'Transform your brand message into compelling visual stories that captivate your audience and drive engagement.',
  },
  {
    icon: Film,
    title: 'Film & Documentary',
    description: 'Craft compelling narratives with professional pacing, color grading, and sound design for an immersive viewing experience.',
  },
  {
    icon: Zap,
    title: 'Visual Effects',
    description: 'Enhance your footage with cutting-edge VFX, motion graphics, and seamless compositing to create stunning visual experiences.',
  },
  {
    icon: FileVideo,
    title: 'Social Media Content',
    description: 'Create engaging, platform-optimized video content that drives engagement and stands out in crowded social feeds.',
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Professional color correction and cinematic grading that enhances mood, atmosphere, and visual storytelling impact.',
  },
  {
    icon: Volume2,
    title: 'Audio Editing',
    description: 'Crystal-clear audio mixing, sound design, and post-production that brings professional polish to every project.',
  },
  {
    icon: Image,
    title: 'Graphic Poster Design',
    description: 'Eye-catching poster designs that communicate your message effectively and leave a lasting visual impact.',
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8">
      {/* Animated video timeline at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-16 border-2 border-green-400/30 rounded-lg flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-4 text-green-400">
          <div className="w-6 h-6 border border-green-400 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          </div>
          <div className="text-sm font-mono">00:00</div>
          <div className="flex-1 h-1 bg-green-400/20 rounded-full relative">
            <div className="w-1/3 h-full bg-green-400 rounded-full"></div>
          </div>
          <div className="text-sm font-mono">03:45</div>
          <div className="w-6 h-6 border border-green-400 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider mb-8">
            OUR <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">SERVICES</span>
          </h2>
          <div className="w-32 h-1 bg-green-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional video editing solutions tailored to your specific needs and vision.
          </p>
        </div>

        {/* Services Grid - 3+3+1 layout */}
        <div className="space-y-8">
          {/* First row - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={index}
                className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 hover:bg-black/60 relative overflow-hidden"
              >
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-500/10 border-2 border-green-400 rounded-full mb-8 group-hover:bg-green-500/20 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                    <service.icon className="w-10 h-10 text-white group-hover:scale-x-[-1] transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-wider">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
                  
                  {/* Bottom accent line */}
                  <div className="w-full h-1 bg-green-400/30 mt-8 group-hover:bg-green-400 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Second row - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(3, 6).map((service, index) => (
              <div
                key={index + 3}
                className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 hover:bg-black/60 relative overflow-hidden"
              >
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-500/10 border-2 border-green-400 rounded-full mb-8 group-hover:bg-green-500/20 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                    <service.icon className="w-10 h-10 text-white group-hover:scale-x-[-1] transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-wider">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
                  
                  {/* Bottom accent line */}
                  <div className="w-full h-1 bg-green-400/30 mt-8 group-hover:bg-green-400 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Third row - 1 service centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {(() => {
                const LastServiceIcon = services[6].icon;
                return (
                  <div className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 hover:bg-black/60 relative overflow-hidden">
                    {/* Neon glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-20 h-20 bg-green-500/10 border-2 border-green-400 rounded-full mb-8 mx-auto group-hover:bg-green-500/20 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                        <LastServiceIcon className="w-10 h-10 text-white group-hover:scale-x-[-1] transition-transform duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-6 tracking-wider text-center">{services[6].title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg text-center">{services[6].description}</p>
                      
                      {/* Bottom accent line */}
                      <div className="w-full h-1 bg-green-400/30 mt-8 group-hover:bg-green-400 transition-all duration-500"></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
