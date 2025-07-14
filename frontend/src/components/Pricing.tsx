import React from 'react';
import { Video, Film, Megaphone, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pricingCategories = [
  {
    title: 'SHORT VIDEOS',
    subtitle: 'REELS, TIKTOK, YOUTUBE SHORTS',
    duration: '(upto 1 minute)',
    icon: Video,
    packages: [
      {
        name: 'Basic',
        price: '$9.35',
        period: 'per project',
        description: 'Get your content noticed with clean, professional editing that captures attention in seconds.',
        features: ['Simple cuts', 'Basic transitions', 'Background music', '1 revision'],
        popular: false
      },
      {
        name: 'Standard',
        price: '$14.03',
        period: 'per project',
        description: 'Transform your ideas into viral-ready content with dynamic visuals and seamless storytelling.',
        features: ['Cuts', 'Advanced transitions', 'Background music', 'Text overlays', 'Colour correction', 'Auto captions', '2 revisions'],
        popular: true
      },
      {
        name: 'Premium',
        price: '$23.38',
        period: 'per project',
        description: 'Create show-stopping content that stands out with cinematic quality and unlimited creative possibilities.',
        features: ['Cuts', 'Advanced transitions', 'Background music', 'Text overlays', 'Colour grading', 'Auto captions', 'Motion graphics', 'SFX', 'Custom animated captions', 'Unlimited revisions'],
        popular: false
      }
    ]
  },
  {
    title: 'LONG VIDEOS',
    subtitle: 'YOUTUBE',
    duration: '(minimum 3 minute)',
    icon: Film,
    packages: [
      {
        name: 'Basic',
        price: '$7.01',
        period: 'per minute',
        description: 'Bring your long-form content to life with professional editing that keeps viewers engaged throughout.',
        features: ['Timeline editing', 'Basic cuts', 'Basic transitions', 'Royalty free background music', '1 revision'],
        popular: false
      },
      {
        name: 'Standard',
        price: '$9.35',
        period: 'per minute',
        description: 'Elevate your YouTube presence with polished videos that drive engagement and subscriber growth.',
        features: ['Timeline editing', 'Cuts', 'Advanced transitions', 'Royalty free background music', 'Text and callouts', 'Color correction', 'Thumbnail design', 'Auto captions', '2 revisions'],
        popular: true
      },
      {
        name: 'Premium',
        price: '$11.69',
        period: 'per minute',
        description: 'Create YouTube masterpieces with broadcast-quality production that sets you apart from the competition.',
        features: ['Timeline editing', 'Cuts', 'Advanced transitions', 'Royalty free background music', 'Text and callouts', 'Color grading', 'Thumbnail design', 'Auto captions', 'Motion graphics', 'SFX', 'Voiceovers', 'Unlimited revisions'],
        popular: false
      }
    ]
  },
  {
    title: 'COMMERCIAL VIDEOS',
    subtitle: 'ADS, PROMOTIONAL',
    duration: '(upto 1 minute)',
    icon: Megaphone,
    packages: [
      {
        name: 'Basic',
        price: '$93.02',
        period: 'per project',
        description: 'Make your brand shine with professional commercial videos that convert viewers into customers.',
        features: ['Raw footage trimming', 'Timeline editing', 'Basic transitions', 'Simple text and logo overlays', 'Background music', '2 revisions'],
        popular: false
      },
      {
        name: 'Standard',
        price: '$139.53',
        period: 'per project',
        description: 'Drive sales and build brand awareness with compelling commercial content that delivers results.',
        features: ['Raw footage trimming', 'Timeline editing', 'Advanced transitions', 'Text and logo overlays', 'Background music', 'Creative animation', 'Colour correction', 'Auto captions', 'SFX', 'Thumbnail', '3 revisions'],
        popular: true
      },
      {
        name: 'Premium',
        price: '$174.42',
        period: 'per project',
        description: 'Create award-winning commercial content with cinematic quality that leaves a lasting impression.',
        features: ['Footage trimming', 'Timeline editing', 'Advanced transitions', 'Text and logo overlays', 'Background music', 'Creative animation', 'Auto captions', 'SFX', 'Motion graphics', 'Cinematic colour grading', 'Voiceovers', 'Custom subtitles', 'Overlays', 'Thumbnail', 'Unlimited revisions'],
        popular: false
      }
    ]
  },
  {
    title: 'FILMS AND PODCAST',
    subtitle: 'SHORT FILM, WEDDING VIDEOS, DOCUMENTARY',
    duration: '',
    icon: Camera,
    packages: [
      {
        name: 'Basic',
        price: '$175.32',
        period: 'per project',
        subtitle: 'upto 10 minutes',
        description: 'Preserve your precious moments with professional film editing that tells your story beautifully.',
        features: ['Raw cut assembly', 'Dialogue sync', 'Audio balancing', 'Titles and end credits', 'Standard transitions', 'Basic SFX', 'Animation', '2 revisions'],
        popular: false
      },
      {
        name: 'Standard',
        price: '$350.64',
        period: 'per project',
        subtitle: 'upto 30 minutes',
        description: 'Transform your vision into cinematic reality with professional-grade editing and storytelling expertise.',
        features: ['Raw cut assembly', 'Dialogue sync', 'Audio balancing', 'Titles and end credits', 'Advanced transitions', 'Standard SFX', 'Creative animation', 'Scene based colour correction', 'Motion titles', 'Lower thirds and text', 'Thumbnail', '3 revisions'],
        popular: true
      },
      {
        name: 'Premium',
        price: '$467.53',
        period: 'per project',
        subtitle: 'upto 90 minutes',
        description: 'Create cinematic masterpieces with Hollywood-level production quality that captivates audiences.',
        features: ['Raw cut assembly', 'Dialogue sync', 'Audio balancing', 'Titles and end credits', 'Advanced transitions', 'Advanced SFX', 'Creative animation', 'Scene based colour grading', 'Motion titles', 'Lower thirds and text', 'Subtitles', 'Motion graphics', 'Opening and ending sequence advanced animation', 'Thumbnails', 'Unlimited revisions'],
        popular: false
      }
    ]
  }
];

const addOns = [
  { name: 'Thumbnail', price: '$7.01' },
  { name: 'Graphic poster', price: '$7.01' },
  { name: 'Logo animation', price: '$9.35' },
  { name: 'VoiceOver', price: '$8.18' },
  { name: 'Subtitles', price: '$5.84' }
];

const fastTurnaround = [
  { name: '24-48 hours for short videos', price: '+25% of base price' },
  { name: '48-72 hours for long videos', price: '+25% of base price' }
];

export const Pricing = () => {
  const navigate = useNavigate();

  const handleViewPackages = (categoryIndex: number) => {
    navigate(`/pricing/${categoryIndex}`);
  };

  return (
    <section id="pricing" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider mb-8">
            <span className="text-white">PRICING</span> <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">PACKAGES</span>
          </h2>
          <div className="w-32 h-1 bg-green-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional video editing packages tailored to your specific needs and budget.
          </p>
        </div>

        {/* 4 Package Options */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400 rounded-full mb-6 mx-auto group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                    <category.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-white">{category.title}</span>
                  </h3>
                  <h4 className="text-lg font-semibold mb-2">
                    <span className="text-green-400">{category.subtitle}</span>
                  </h4>
                  <p className="text-gray-400 text-center mb-4 text-sm">{category.duration}</p>
                  <div className="text-center">
                    <Button 
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      onClick={() => handleViewPackages(index)}
                    >
                      View Packages
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons and Fast Turnaround */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <div className="bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm border-2 border-green-500/50 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="text-white">ADD-ON</span> <span className="text-green-400">SERVICES</span>
            </h3>
            <ul className="space-y-4">
              {addOns.map((addon, index) => (
                <li key={index} className="flex justify-between items-center text-gray-300 border-b border-gray-700/50 pb-3 hover:border-green-500/50 transition-all duration-300">
                  <span className="text-white">{addon.name}</span>
                  <span className="text-green-400 font-bold">{addon.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm border-2 border-green-500/50 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="text-white">FAST</span> <span className="text-green-400">TURNAROUND</span>
            </h3>
            <ul className="space-y-4">
              {fastTurnaround.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-gray-300 border-b border-gray-700/50 pb-3 hover:border-green-500/50 transition-all duration-300">
                  <span className="text-white">{item.name}</span>
                  <span className="text-green-400 font-bold">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ready to Get Started */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 max-w-2xl mx-auto hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">Choose the perfect package that matches your vision and budget. Let our expert editors transform your raw footage into compelling stories that captivate your audience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
