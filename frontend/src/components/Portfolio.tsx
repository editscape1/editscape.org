import { useState, useEffect } from 'react';
import { Plus, FileVideo, Image as ImageIcon, Upload, Cloud, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: string;
}

export const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    image_url: '',
    link: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio/');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setPortfolioItems(data);
    } catch (err) {
      // Only show a toast, but do NOT return or break rendering
      // toast.error('Failed to load portfolio.');
      setPortfolioItems([]); // Ensure it's an empty array, not undefined
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.description || !newItem.image_url || !newItem.link) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to add item.');
      } else {
        toast.success('Portfolio item added successfully!');
        setNewItem({ title: '', description: '', image_url: '', link: '' });
        setIsDialogOpen(false);
        fetchPortfolio();
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete item.');
      } else {
        toast.success('Portfolio item deleted.');
        fetchPortfolio();
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
  };

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
          <>
            {/* Static portfolio item example */}
            <div className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl overflow-hidden hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative">
              <div className="relative h-64 bg-gray-800">
                <img
                  src="https://res.cloudinary.com/dijbpjech/image/upload/v1752495311/Image_ujkxqb.jpg"
                  alt="Pharmaceutical Product Edit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wider">Pharmaceutical Product Edit</h3>
                <p className="text-gray-300 leading-relaxed">
                  A visually striking product ad created for apo-RHEUM Joint Pain Drops, blending high-speed splash effects with dramatic lighting to capture freshness and impact. The composition emphasizes clarity, precision, and vitality—hallmarks of pharmaceutical product visuals. Edited for premium branding appeal, this image showcases our expertise in product visualization, retouching, and motion-inspired static imagery.
                </p>
              </div>
            </div>
            {portfolioItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl overflow-hidden hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 relative"
                  >
                    <div className="relative h-64 bg-gray-800">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-20 h-20 text-green-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-wider">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                      <div className="flex justify-between mt-4">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">View</a>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
