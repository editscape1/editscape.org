import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBarWithWave from './ProgressBarWithWave';
import { apiService, PortfolioItem } from '@/services/api';

// Fallback sample data
const samplePortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Pharmaceutical Product Edit',
    description:
      'A sleek, cinematic edit using dramatic lighting, sharp focus pulls, and dynamic splash effects. Every frame is crafted to feel high-end and impactful—highlighting precision, clarity, and visual intensity through polished motion and bold contrast.',
    image_url:
      'https://res.cloudinary.com/dijbpjech/image/upload/v1752495311/Image_ujkxqb.jpg',
    type: 'image',
    link: '#',
    created_at: '2024-06-01',
  },
  {
    id: 2,
    title: 'Sundae Commercial Edit',
    description:
      'A vibrant, high-energy edit featuring sharp cuts, fluid transitions, and rhythmic pacing. The color grade enhances sweetness and summer vibes, while motion design adds a playful punch—crafted to keep viewers visually engaged from start to finish.',
    video_url:
      'https://res.cloudinary.com/dijbpjech/video/upload/v1754899254/sandaeedit_dysxg7.mp4',
    type: 'video',
    link: '#',
    created_at: '2024-06-01',
  },
  {
    id: 3,
    title: 'Alpino Super Oats Edit',
    description:
      'A crisp commercial-style edit with tight pacing, bold motion graphics, and clean transitions. Built for digital ads, it blends energetic visuals with quick cuts and vibrant color grading to maximize viewer retention and brand recall.',
    video_url:
      'https://res.cloudinary.com/dijbpjech/video/upload/v1754899091/alpinoedit_jdmiqe.mp4',
    type: 'video',
    link: '#',
    created_at: '2024-06-01',
  },
  {
    id: 4,
    title: 'Dreamscape Travel Edit',
    description:
      'A cinematic travel montage with film-style color grading, soft transitions, and slow, immersive pacing. Dreamy visuals flow seamlessly, creating a nostalgic, almost timeless atmosphere that draws viewers into the journey.'
    video_url:
      'https://res.cloudinary.com/dijbpjech/video/upload/v1754898437/travel_xmqqxk.mp4',
    type: 'video',
    link: '#',
    created_at: '2024-06-01',
  },
];

export const Portfolio = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[] | null>(null);
  const [loaderDuration, setLoaderDuration] = useState(4000);

  useEffect(() => {
    if (!showPortfolio) return;

    let didCancel = false;
    setItems(null);
    setLoading(false);

    const delay = Math.random() < 0.5 ? 80 : 1200;
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
          setItems(samplePortfolioItems);
          setLoading(false);
        }
      }
    };

    if (delay > 400) {
      setLoaderDuration(delay);
      showLoaderTimeout = setTimeout(() => setLoading(true), 250);
      loaderTimeout = setTimeout(() => {
        if (!didCancel) fetchPortfolio();
      }, delay);
    } else {
      showLoaderTimeout = setTimeout(() => {
        setLoading(true);
        setLoaderDuration(4000);
        loaderTimeout = setTimeout(() => {
          if (!didCancel) fetchPortfolio();
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
            VIEW{' '}
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">
              PORTFOLIO
            </span>
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
                  <div
                    key={item.id}
                    className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl overflow-hidden hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative"
                  >
                    <div className="relative aspect-[16/9] bg-gray-800">
                      {item.image_url.toLowerCase().endsWith('.mp4') ? (
                        <video
                          src={item.image_url}
                          type="video/mp4"
                          controls
                          preload="metadata"
                          className="w-full h-[300px] object-contain cursor-pointer"
                          onClick={(e) => {
                            const video = e.target as HTMLVideoElement;
                            video.paused ? video.play() : video.pause();
                          }}
                          onEnded={(e) =>
                            (e.target as HTMLVideoElement).pause()
                          }
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-[300px] object-contain cursor-pointer"
                          onClick={(e) => {
                            const el = e.target as HTMLImageElement;
                            if (el.requestFullscreen) el.requestFullscreen();
                            else if ((el as any).webkitRequestFullscreen)
                              (el as any).webkitRequestFullscreen();
                            else if ((el as any).msRequestFullscreen)
                              (el as any).msRequestFullscreen();
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-[13px] leading-relaxed whitespace-pre-line line-clamp-5">
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
