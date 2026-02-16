import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants.tsx';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const words = ["Intelligence", "Innovation", "Excellence", "Digital Art"];

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        typeSpeed = 50;
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 animate-fade-in uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Available for Internships
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-heading">
              Engineering <br />
              <span className="gradient-text min-w-[300px] inline-block">
                {typingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1 h-12 ml-1 bg-blue-500 align-middle"
                />
              </span> into <br />
              tomorrow.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
              I'm <span className="text-[var(--text-primary)] font-semibold">Nandhika S</span>, a second-year AI & Data Science student. I specialize in building predictive models and intelligent interfaces that transform data into impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="#projects"
                onClick={(e) => scrollToId(e, 'projects')}
                className="px-8 py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-white/5"
              >
                Explore My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToId(e, 'contact')}
                className="px-8 py-4 rounded-2xl glass text-[var(--text-primary)] font-bold hover:bg-white/10 transition-all text-center border border-white/10"
              >
                Let's Connect
              </a>
            </div>

            <div className="mt-16 flex items-center gap-12 text-slate-500">
              <div className="flex flex-col">
                <span className="text-[var(--text-primary)] font-bold text-3xl">8.33</span>
                <span className="text-xs uppercase tracking-widest font-medium">CGPA</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[var(--text-primary)] font-bold text-3xl">TOP 5</span>
                <span className="text-xs uppercase tracking-widest font-medium">Class Rank</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:w-1/2 relative">
            <div className="w-full aspect-square max-w-md mx-auto rounded-[60px] overflow-hidden border-8 border-white/5 relative z-10 shadow-2xl bg-slate-900 flex items-center justify-center group">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Nandhika+S&size=512&background=0D8ABC&color=fff";
                }}
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  );
};

export default Hero;