import { useState, useEffect } from 'react';
import { Plus, FileVideo, Image as ImageIcon, Upload, Cloud, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ProgressBarWithWave from './ProgressBarWithWave';
import { apiService, PortfolioItem } from '@/services/api';

// Sample portfolio data for fallback
const samplePortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Pharmaceutical Product Edit',
    description: 'This visual edit was crafted to elevate a pharmaceutical product—Apo-RHEUM Joint Pain Drops—into a premium, high-impact advertisement. The design centers the product with dramatic lighting and a crystal-clear focus, while surrounding it with dynamic water splashes to symbolize relief, purity, and efficacy. The color grading enhances the cool, clinical tones of trust and precision, while maintaining a visually immersive and futuristic aesthetic. Typography is bold and purposeful, delivering key product benefits with clarity and authority',
    image_url: 'https://res.cloudinary.com/dijbpjech/image/upload/v1752495311/Image_ujkxqb.jpg',
    link: '#',
    created_at: '2024-06-01',
  },
  {
    id: 2,
    title: 'Alpino Super Oats Edit',
    description: 'This edit brings Alpino Oats to life with punchy motion, dynamic text reveals, and a bold visual rhythm. Each frame is designed to catch the eye — from smooth zooms to kinetic cuts that sync perfectly with on-screen messaging.The aesthetic stays modern and minimal, letting the product visuals shine without clutter. A tight, engaging flow makes this ideal for digital-first platforms and brands looking to break through the noise with scroll-stopping clarity.',
    image_url: 'https://res.cloudinary.com/dijbpjech/video/upload/v1753683607/11g_Fibre_w4cvgz.mp4',
    link: '#',
    created_at: '2024-06-01',
  },
];

export const Portfolio = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[] | null>(null);
  const [loaderDuration, setLoaderDuration] = useState(4000); // default 4s
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showPortfolio) return;
    
    let didCancel = false;
    setItems(null);
    setLoading(false);
    setError(null);
    
    // Simulate fast or slow backend (randomly fast or slow)
    const delay = Math.random() < 0.5 ? 80 : 1200; // 50% chance of 'cold start'
    let loaderTimeout: NodeJS.Timeout;
    let showLoaderTimeout: NodeJS.Timeout;
    
    const fetchPortfolio = async () => {
      try {
        const portfolioItems = await apiService.getPortfolio();
        if (!didCancel) {
          setItems(portfolioItems);
          setLoading(false);
        }
      } catch (err) {
        if (!didCancel) {
          console.error('Failed to fetch portfolio:', err);
          // Use sample data as fallback when backend is not available
          setItems(samplePortfolioItems);
          setLoading(false);
        }
      }
    };

    if (delay > 400) {
      // Cold start: loader for full backend delay
      setLoaderDuration(delay);
      showLoaderTimeout = setTimeout(() => setLoading(true), 250);
      loaderTimeout = setTimeout(() => {
        if (!didCancel) {
          fetchPortfolio();
        }
      }, delay);
    } else {
      // Warm: loader for 4s starting from when it actually appears
      showLoaderTimeout = setTimeout(() => {
        setLoading(true);
        setLoaderDuration(4000);
        loaderTimeout = setTimeout(() => {
          if (!didCancel) {
            fetchPortfolio();
          }
        }, 4000);
      }, 250);
    }
    
    return () => {
      didCancel = true;
      clearTimeout(loaderTimeout);
      clearTimeout(showLoaderTimeout);
    };
  }, [showPortfolio]);

  return (
    <section id="portfolio" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider mb-8">
            VIEW <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">PORTFOLIO</span>
          </h2>
          <div className="w-32 h-1 bg-green-400 mx-auto mb-8"></div>
          {!showPortfolio && (
            <button
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-xl border-2 border-green-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 text-2xl md:text-3xl tracking-wider mb-8"
              onClick={() => setShowPortfolio(true)}
            >
              View Portfolio
            </button>
          )}
        </div>
        {showPortfolio && (
          <div className="flex flex-col items-center">
            {loading && <ProgressBarWithWave duration={loaderDuration} />}
            {items && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {items.map((item) => (
                  <div key={item.id} className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl overflow-hidden hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative">
                    <div className="relative aspect-[16/9] bg-gray-800">
                   {item.image_url.toLowerCase().endsWith('.mp4') ? (
  <video
    src={item.image_url}
    type="video/mp4"
    controls
    preload="metadata"
    className="w-full h-75% object-contain cursor-pointer"
    onClick={(e) => {
      if (e.target.paused) {
        e.target.play();
      } else {
        e.target.pause();
      }
    }}
    onEnded={(e) => e.target.pause()}
  >
    Your browser does not support the video tag.
  </video>
) : (
                    <img
  src={item.image_url}
  alt={item.title}
  className="w-full h-75% object-contain cursor-pointer"
  onClick={(e) => {
    if (e.target.requestFullscreen) {
      e.target.requestFullscreen();
    } else if (e.target.webkitRequestFullscreen) {
      e.target.webkitRequestFullscreen();
    } else if (e.target.msRequestFullscreen) {
      e.target.msRequestFullscreen();
    }
  }}
/>

                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 tracking-wider">{item.title}</h3>
                      <p className="text-gray-400 text-[11px] leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
