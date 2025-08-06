import React from 'react';
import { TrendingUp, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Learnings', href: '#learnings' },
    { name: 'Market Overview', href: '#market-overview' },
    { name: 'Analysis Tools', href: '#investo-analysis' },
    { name: 'Smart Desk', href: '#smart-desk' }
  ];

  const resources = [
    { name: 'Investment Guide', href: '#' },
    { name: 'Market Research', href: '#' },
    { name: 'Educational Videos', href: '#videos' },
    { name: 'FAQ', href: '#' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">Investokid</span>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed font-light text-lg">
              Your trusted partner in financial education and investment excellence. 
              Empowering the next generation of sophisticated investors.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-400 hover:to-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-lg hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-8 tracking-tight">Resources</h4>
            <ul className="space-y-4">
              {resources.map((resource, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(resource.href)}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 font-medium text-lg hover:translate-x-1 transform transition-transform"
                  >
                    {resource.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-8 tracking-tight">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <a href="mailto:info@investokid.com" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                  info@investokid.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-amber-400" />
                </div>
                <a href="tel:+1234567890" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-amber-400" />
                </div>
                <span className="text-slate-300 font-medium">123 Finance Street, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 mb-6 md:mb-0 font-medium">
            &copy; 2024 Investokid. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors font-medium">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;