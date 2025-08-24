import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">
            Kethari Gayathri
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(section.id)}
                className={`transition-all duration-300 ${
                  activeSection === section.id 
                    ? "bg-primary/20 text-primary border border-primary/30 glow-text" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {section.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
              <span className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : 'mt-1'}`} />
              <span className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'mt-1'}`} />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in-up">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  onSectionChange(section.id);
                  setIsOpen(false);
                }}
                className={`w-full justify-start transition-all duration-300 ${
                  activeSection === section.id 
                    ? "bg-primary/20 text-primary border border-primary/30" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {section.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};