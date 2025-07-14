import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, Film, Megaphone, Camera, Star, Crown, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';

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
        description: 'Perfect for creators just starting their journey into professional video editing.',
        features: ['Simple cuts', 'Basic transitions', 'Background music', '1 revision'],
        popular: false
      },
      {
        name: 'Standard',
        price: '$14.03',
        period: 'per project',
        description: 'Ideal for content creators who want to stand out with polished, engaging videos.',
        features: ['Cuts', 'Advanced transitions', 'Background music', 'Text overlays', 'Colour correction', 'Auto captions', '2 revisions'],
        popular: true
      },
      {
        name: 'Premium',
        price: '$23.38',
        period: 'per project',
        description: 'For professionals who demand nothing less than perfection in every frame.',
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

export const PricingPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const categoryIndex = category ? parseInt(category) : 0;
  const selectedCategory = pricingCategories[categoryIndex];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPackageIcon = (packageName: string) => {
    switch (packageName) {
      case 'Basic': return Star;
      case 'Standard': return Crown;
      case 'Premium': return Zap;
      default: return Star;
    }
  };

  const handleBackToPricing = () => {
    navigate('/', { replace: true });
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!selectedCategory) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Button 
              onClick={handleBackToPricing}
              className="mb-8 bg-transparent border-2 border-green-400 text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white hover:border-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-wider mb-4">
              <span className="text-white">{selectedCategory.title}</span> <span className="text-green-400">PACKAGES</span>
            </h1>
            <p className="text-gray-400 text-lg mb-2">{selectedCategory.subtitle}</p>
            <p className="text-gray-500 text-sm">{selectedCategory.duration}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCategory.packages.map((pkg, pkgIndex) => {
              const PackageIcon = getPackageIcon(pkg.name);
              const isPopular = pkg.popular;
              
              return (
                <div key={pkgIndex} className={`relative ${isPopular ? 'transform scale-105 z-20' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-30">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`bg-gradient-to-br from-gray-900/90 via-black/70 to-gray-800/90 backdrop-blur-md border-2 ${isPopular ? 'border-green-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-green-500/30'} rounded-xl p-8 h-full transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 hover:-translate-y-2 cursor-pointer group`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className={`flex items-center justify-center w-16 h-16 ${isPopular ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-green-500/20 to-blue-500/20'} border-2 border-green-400 rounded-full mb-4 mx-auto group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300`}>
                          <PackageIcon className={`w-8 h-8 ${isPopular ? 'text-white' : 'text-green-400'}`} />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3">{pkg.name}</h4>
                        <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">{pkg.price}</div>
                        <div className="text-gray-400 text-sm">{pkg.period}</div>
                        {pkg.subtitle && (
                          <div className="text-green-300 text-sm mt-2 font-medium">{pkg.subtitle}</div>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-gray-300 text-sm leading-relaxed">{pkg.description}</p>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-300 text-sm flex items-start">
                            <span className="text-green-400 mr-3 mt-1 text-lg">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button className={`w-full ${isPopular ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white' : 'bg-transparent border-2 border-green-400 text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white hover:border-transparent'} font-bold transition-all duration-300 py-3`}>
                        Choose {pkg.name}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
