import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to send message.');
      } else {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      toast.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GET IN <span className="text-green-400">TOUCH</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Name</h4>
                <p className="text-gray-300">Aarpita Mehta</p>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Phone</h4>
                <p className="text-gray-300">+91 7657803760</p>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Email</h4>
                <p className="text-gray-300">editscape.org@gmail.com</p>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Location</h4>
                <p className="text-gray-300">Punjab, India - 140603</p>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Instagram</h4>
                <div className="space-y-1">
                  <p className="text-gray-300">Company: @editscape._</p>
                  <p className="text-gray-300">Owner: @aarpita_mehta</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-900/50 border-green-500/20 text-white placeholder-gray-400 focus:border-green-500"
                disabled={loading}
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-900/50 border-green-500/20 text-white placeholder-gray-400 focus:border-green-500"
                disabled={loading}
              />
              <Textarea
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-gray-900/50 border-green-500/20 text-white placeholder-gray-400 focus:border-green-500"
                disabled={loading}
              />
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
