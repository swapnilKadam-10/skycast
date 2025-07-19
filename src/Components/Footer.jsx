import React from 'react';
import { Heart,  Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export const Footer = () => {

  const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK
  const LINKDIN_LINK = import.meta.env.VITE_LINKDIN_LINK
  const EMAIL = import.meta.env.VITE_EMAIL
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-white/90">
            <span>Made with ❤️</span>
            
            <span>by</span>
            <span className="font-semibold text-white">Swapnil</span>
          </div>
          
          {/* Copyright */}
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} SkyCast. All rights reserved.
          </div>
          
          {/* Social Links (Optional) */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <a 
              href={GITHUB_LINK} 
              target='_blank'
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href={LINKDIN_LINK} 
              target='_blank'
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${EMAIL}`}
              target='_blank'
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          {/* Additional Info */}
          <div className="text-white/50 text-xs pt-2 border-t border-white/10">
            Powered by OpenWeather API • Built with React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};