
import { useState } from 'react';
import { Upload, Camera } from 'lucide-react';

export const About = () => {
  const [profileImage, setProfileImage] = useState<string>('/lovable-uploads/aarpita-profile.png');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider mb-8">
            ABOUT <span className="text-green-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">US</span>
          </h2>
          <div className="w-32 h-1 bg-green-400 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-6">
                Meet <span className="text-green-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">Aarpita Mehta</span>
              </h3>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  As the founder and creative director of EDITSCAPE, I bring passion and technical expertise to every project. With a keen eye for detail and a deep understanding of visual storytelling, I transform raw footage into compelling narratives.
                </p>
                <p>
                  My journey in video editing began with a fascination for how post-production can completely transform the emotional impact of a scene. Today, I work with clients across various industries to help them sculpt their vision into reality.
                </p>
                <p>
                  At EDITSCAPE, we don't just edit videos; we craft experiences that resonate with audiences and achieve your communication goals.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Profile Card */}
            <div className="bg-black/40 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/80 transition-all duration-500 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
              
              <div className="relative z-10 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img 
                    src={profileImage} 
                    alt="Aarpita Mehta" 
                    className="w-full h-full rounded-full object-cover object-center border-4 border-green-500 shadow-[0_0_30px_rgba(16,185,129,0.6)] scale-110"
                  />
                  
                  {/* Upload overlay */}
                  <label 
                    htmlFor="profile-upload" 
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Camera className="text-white w-8 h-8" />
                  </label>
                  <input 
                    id="profile-upload"
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2 tracking-wider">AARPITA MEHTA</h3>
                <p className="text-green-400 font-bold mb-4 text-lg">Founder & Creative Director</p>
                <p className="text-gray-400">Transforming visions into visual masterpieces</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
