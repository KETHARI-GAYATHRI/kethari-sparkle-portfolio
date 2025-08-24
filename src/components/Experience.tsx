import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building, Award } from 'lucide-react';

export const Experience = () => {
  const experience = {
    company: "Rooman Technologies",
    position: "Application Developer - Web & Mobile",
    duration: "May 2025 - July 2025",
    type: "Internship",
    location: "Remote",
    description: "Completed a comprehensive certificate program in Application Development covering both Web and Mobile technologies. Gained hands-on experience with modern development practices and industry-standard tools.",
    technologies: ["Core Java", "Advanced Java (JDBC, Servlets)", "HTML", "CSS", "JavaScript"],
    achievements: [
      "Successfully completed comprehensive training in full-stack development",
      "Gained practical experience with JDBC and Servlet technologies",
      "Developed strong foundation in web application architecture",
      "Learned industry best practices for application development"
    ]
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional development through internships and hands-on learning
          </p>
        </div>

        {/* Experience Card */}
        <Card className="skill-card p-8 hover-float bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{experience.position}</h3>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Building size={20} />
                  <span>{experience.company}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge 
                  variant="secondary"
                  className="bg-secondary/20 text-secondary border-secondary/30 w-fit"
                >
                  {experience.type}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar size={16} />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin size={16} />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Award className="text-primary" size={20} />
                Technologies & Skills Acquired:
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="bg-background/30 border-primary/30 text-foreground hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Key Achievements:</h4>
              <div className="grid gap-3">
                {experience.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/10 hover:bg-background/20 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 animate-pulse"></div>
                    <span className="text-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Future Goals */}
        <Card className="skill-card p-8 hover-float mt-12 bg-gradient-to-br from-accent/10 to-tertiary/10 border-accent/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Looking Forward</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Seeking entry-level opportunities to apply my knowledge in software development, 
              contribute to meaningful projects, and continue growing as a technology professional. 
              Eager to join a dynamic team where I can learn, innovate, and make a positive impact.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};