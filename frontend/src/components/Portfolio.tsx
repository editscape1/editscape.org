import { useState, useEffect } from 'react';
import { Plus, FileVideo, Image as ImageIcon, Upload, Cloud, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ProgressBarWithWave from './ProgressBarWithWave';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: string;
}

export const Portfolio = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[] | null>(null);
  const [loaderDuration, setLoaderDuration] = useState(4000); // default 4s

  useEffect(() => {
    if (!showPortfolio) return;
    let didCancel = false;
    setItems(null);
    setLoading(false);
    // Simulate fast or slow backend (randomly fast or slow)
    const delay = Math.random() < 0.5 ? 80 : 1200; // 50% chance of 'cold start'
    let loaderTimeout: NodeJS.Timeout;
    let showLoaderTimeout: NodeJS.Timeout;
    if (delay > 400) {
      // Cold start: loader for full backend delay
      setLoaderDuration(delay);
      showLoaderTimeout = setTimeout(() => setLoading(true), 250);
      loaderTimeout = setTimeout(() => {
        if (!didCancel) {
          setItems([
            {
              id: 1,
              title: 'Pharmaceutical Product Edit',
              description:
                'A visually striking product ad created for apo-RHEUM Joint Pain Drops, blending high-speed splash effects with dramatic lighting to capture freshness and impact. The composition emphasizes clarity, precision, and vitality—hallmarks of pharmaceutical product visuals. Edited for premium branding appeal, this image showcases our expertise in product visualization, retouching, and motion-inspired static imagery.',
              image_url:
                'https://res.cloudinary.com/dijbpjech/image/upload/v1752495311/Image_ujkxqb.jpg',
              link: '#',
              created_at: '2024-06-01',
            },
          ]);
          setLoading(false);
        }
      }, delay);
    } else {
      // Warm: loader for 4s starting from when it actually appears
      showLoaderTimeout = setTimeout(() => {
        setLoading(true);
        setLoaderDuration(4000);
        loaderTimeout = setTimeout(() => {
          if (!didCancel) {
            setItems([
              {
                id: 1,
                title: 'Pharmaceutical Product Edit',
                description:
                  'A visually striking product ad created for apo-RHEUM Joint Pain Drops, blending high-speed splash effects with dramatic lighting to capture freshness and impact. The composition emphasizes clarity, precision, and vitality—hallmarks of pharmaceutical product visuals. Edited for premium branding appeal, this image showcases our expertise in product visualization, retouching, and motion-inspired static imagery.',
                image_url:
                  'https://res.cloudinary.com/dijbpjech/image/upload/v1752495311/Image_ujkxqb.jpg',
                link: '#',
                created_at: '2024-06-01',
              },
            ]);
            setLoading(false);
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
              <div className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl overflow-hidden hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative mt-8">
                <div className="relative h-64 bg-gray-800">
                    <img
                    src={items[0].image_url}
                    alt={items[0].title}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wider">{items[0].title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {items[0].description}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
