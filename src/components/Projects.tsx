import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Database, Antenna, BookOpen } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "Library Management System",
      description: "Developed a comprehensive Library Management System using Java, JDBC, and MySQL with features including book browsing, user authentication, and login validation. Implemented secure access controls, efficient data storage, and seamless workflows for both new and existing users.",
      technologies: ["Java", "JDBC", "MySQL", "Database Design"],
      icon: <BookOpen className="text-primary" size={32} />,
      features: [
        "User Authentication & Login Validation",
        "Book Browsing & Search Functionality", 
        "Secure Data Storage with MySQL",
        "Efficient User Management System"
      ],
      gradient: "from-primary/20 to-primary-glow/20"
    },
    {
      title: "Miniaturized Tapered Patch Antenna for GPS",
      description: "Research project focused on miniaturizing and enhancing gain of a tapered Microstrip patch antenna for GPS L1 Band at 1.575GHz. Successfully utilized Defected Ground Structure and Metamaterial Superstate to achieve frequency switching from 14.5GHz to 1.575GHz.",
      technologies: ["VLSI Design", "Antenna Design", "Metamaterials", "GPS Technology"],
      icon: <Antenna className="text-secondary" size={32} />,
      features: [
        "Frequency Optimization (14.5GHz → 1.575GHz)",
        "Defected Ground Structure Implementation",
        "Metamaterial Superstate Integration",
        "GPS L1 Band Compatibility"
      ],
      gradient: "from-secondary/20 to-secondary-glow/20"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase of technical projects demonstrating programming and engineering skills
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className={`skill-card p-8 hover-float bg-gradient-to-br ${project.gradient} border-primary/20`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-background/20">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline"
                          className="bg-background/30 border-primary/30 text-foreground hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      variant="default"
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-float"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-primary/30 text-primary hover:bg-primary/10 hover-float"
                    >
                      <Github size={16} className="mr-2" />
                      Source Code
                    </Button>
                  </div>
                </div>

                {/* Project Features */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-foreground">Key Features:</h4>
                  <div className="space-y-4">
                    {project.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start gap-3 p-3 rounded-lg bg-background/10 hover:bg-background/20 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="skill-card p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Interested in My Work?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always working on new projects and exploring emerging technologies. 
              Let's connect to discuss potential collaborations or opportunities.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover-float hover-glow px-8"
            >
              <Github size={20} className="mr-2" />
              View More Projects
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};