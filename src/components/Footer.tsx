
export const Footer = () => {
  return (
    <footer className="relative bg-gray-900/80 backdrop-blur-sm border-t border-green-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-green-400 mb-4">EDITSCAPE</div>
            <p className="text-gray-400 text-sm mb-4">SCULPTING YOUR VISION INTO REALITY</p>
            <p className="text-gray-500 text-sm">
              Professional video editing services that transform your creative vision into compelling visual stories.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Commercial Editing</li>
              <li>Film & Documentary</li>
              <li>Visual Effects</li>
              <li>Social Media Content</li>
              <li>Color Grading</li>
              <li>Audio Editing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Aarpita Mehta</p>
              <p>+91 7657803760</p>
              <p>editscape.org@gmail.com</p>
              <p>Punjab, India - 140603</p>
              <div className="mt-4">
                <p>@editscape._</p>
                <p>@aarpita_mehta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 EDITSCAPE. All rights reserved. | Crafted with passion for visual storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
};
