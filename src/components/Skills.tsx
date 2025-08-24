import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Wrench, Users, Brain } from 'lucide-react';
import skillsBg from '@/assets/skills-bg.jpg';

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-primary" size={24} />,
      skills: ["Java", "HTML", "CSS", "JavaScript", "DSA", "JDBC"],
      gradient: "from-primary/20 to-primary-glow/20"
    },
    {
      title: "Tools & Technologies", 
      icon: <Wrench className="text-secondary" size={24} />,
      skills: ["Git", "GitHub", "VS Code", "Eclipse", "RFSD", "PCBD", "Matlab"],
      gradient: "from-secondary/20 to-secondary-glow/20"
    },
    {
      title: "Databases",
      icon: <Database className="text-accent" size={24} />,
      skills: ["MySQL", "MongoDB"],
      gradient: "from-accent/20 to-accent-glow/20"
    },
    {
      title: "Specialized Skills",
      icon: <Brain className="text-tertiary" size={24} />,
      skills: ["VLSI Design", "Digital Circuit Design", "Circuit Simulation", "Antenna Design"],
      gradient: "from-tertiary/20 to-yellow-400/20"
    },
    {
      title: "Soft Skills",
      icon: <Users className="text-primary" size={24} />,
      skills: ["Leadership", "Problem Solving", "Event Management", "Time Management"],
      gradient: "from-primary/20 to-secondary/20"
    }
  ];

  const certificates = [
    "C Programming",
    "IIRS - Overview of Geocomputation and Geo-web services",
    "IIRS - Basics of Remote Sensing, GIS and GNSS",
    "NPTEL Certified in CAO (2024)",
    "English Lower Grade Typing (July 2022)",
    "English Higher Grade Typing (October 2022)"
  ];

  return (
    <section 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${skillsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical skills and knowledge gained through education and hands-on experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`skill-card p-6 hover-float bg-gradient-to-br ${category.gradient} border-primary/20`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-background/20">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="secondary"
                    className="bg-background/30 text-foreground hover:bg-background/50 transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold mb-8 text-center gradient-text">Certifications</h3>
          <Card className="skill-card p-8 hover-float">
            <div className="grid md:grid-cols-2 gap-4">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};