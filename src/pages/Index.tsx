import { useState, useEffect } from 'react';
import { BallpitCanvas } from '@/components/BallpitCanvas';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Advanced 3D Ballpit Background */}
      <BallpitCanvas 
        count={60}
        gravity={0.008}
        friction={0.998}
        wallBounce={0.92}
        followCursor={true}
        colors={[0x00d4ff, 0x8b5cf6, 0xf59e0b, 0xef4444, 0x10b981, 0xff6b9d]}
        ambientIntensity={0.3}
        lightIntensity={0.8}
        minSize={0.08}
        maxSize={0.25}
        maxVelocity={0.08}
      />
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />
      
      {/* Sections */}
      <main>
        <section id="home">
          <Hero onNavigate={scrollToSection} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="experience">
          <Experience />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Index;
