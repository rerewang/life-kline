import React from 'react';
import { Twitter, MessageCircle, Share2 } from 'lucide-react';

interface SocialLinksProps {
  twitter?: string;
  qqGroup?: string;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  twitter = 'https://twitter.com/0xSakura666',
  qqGroup = 'https://qm.qq.com/q/IwKT7MHWAm',
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {twitter && (
        <a 
          href={twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-blue-400 transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
      )}
      {qqGroup && (
        <a 
          href={qqGroup} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-slate-400 hover:text-green-400 transition-colors text-sm"
          aria-label="QQ群"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">QQ群</span>
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
