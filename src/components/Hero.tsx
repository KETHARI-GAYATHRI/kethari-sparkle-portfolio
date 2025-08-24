import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextType } from './TextType';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const titleTexts = [
    "Kethari Gayathri",
    "ECE Student", 
    "Application Developer",
    "Tech Enthusiast"
  ];

  const subtitleTexts = [
    "Electronics & Communication Engineering Student",
    "Java Developer & VLSI Designer",
    "Passionate About Innovation",
    "Ready to Make an Impact"
  ];

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 3000);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 5000);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 animate-fade-in-up">
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 hover-glow transition-all duration-500 hover:border-primary/60 hover:scale-105">
            <img 
              src="/lovable-uploads/c8e34eb6-2530-4350-a3e8-0a265d45cd2b.png" 
              alt="Kethari Gayathri - Electronics & Communication Engineering Student" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Animated Name with Typewriter Effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 min-h-[120px] flex items-center justify-center">
          <TextType
            text={titleTexts}
            className="gradient-text glow-text"
            typingSpeed={100}
            pauseDuration={2000}
            deletingSpeed={60}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-primary animate-pulse"
            variableSpeed={{min: 80, max: 120}}
            onSentenceComplete={(sentence, index) => {
              if (index === 0 && !showSubtitle) {
                setShowSubtitle(true);
              }
            }}
          />
        </h1>

        {/* Animated Subtitle */}
        {showSubtitle && (
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 min-h-[80px] flex items-center justify-center animate-fade-in-up">
            <TextType 
              text={subtitleTexts}
              typingSpeed={60}
              pauseDuration={3000}
              deletingSpeed={40}
              loop={true}
              showCursor={false}
              className="text-secondary"
            />
          </div>
        )}

        {/* Description */}
        {showButtons && (
          <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            A self-motivated and enthusiastic fresher with a strong passion for learning new technologies 
            and contributing to meaningful projects. Committed to continuous learning and professional growth.
          </div>
        )}

        {/* Action Buttons */}
        {showButtons && (
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center animate-fade-in-up">
            <Button 
              size="lg" 
              onClick={() => onNavigate('projects')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full hover-float hover-glow transition-all duration-300"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('contact')}
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 font-semibold px-8 py-3 rounded-full hover-float transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        )}

        {/* Social Links */}
        {showButtons && (
          <div className="flex justify-center space-x-6 mt-12 animate-fade-in-up">
            <a 
              href="https://linkedin.com/in/kethari-gayathri-4b8a83318" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-glow transition-all duration-300 hover-float hover-glow"
              aria-label="Connect with Kethari Gayathri on LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-glow transition-all duration-300 hover-float hover-glow"
              aria-label="View Kethari Gayathri's GitHub profile"
            >
              <Github size={24} />
            </a>
            <a 
              href="mailto:ketharigayathri@gmail.com"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-glow transition-all duration-300 hover-float hover-glow"
              aria-label="Send email to Kethari Gayathri"
            >
              <Mail size={24} />
            </a>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};