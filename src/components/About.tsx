import { Card } from '@/components/ui/card';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import aboutBg from '@/assets/about-bg.jpg';

export const About = () => {
  const education = [
    {
      institution: "St Johns College of Engineering & Technology",
      degree: "B.Tech in Electronics & Communication Engineering",
      duration: "2022-2026",
      percentage: "85%",
      location: "Yerrakota, Andhra Pradesh, India",
      status: "Pursuing"
    },
    {
      institution: "Dr. Jyothrimayi Junior Memorial College",
      degree: "Mathematics, Physics & Chemistry",
      duration: "2020-2022",
      percentage: "92.7%",
      location: "Adoni, Andhra Pradesh, India",
      status: "Completed"
    },
    {
      institution: "Sri Sarada Niketan High School",
      degree: "SSC",
      duration: "2019-2020",
      percentage: "CGPA: 10",
      location: "Adoni, Andhra Pradesh, India",
      status: "Completed"
    }
  ];

  const achievements = [
    "Secured 2nd Prize in KVSR Institute, paper presentation",
    "Secured 2nd prize in GPRE Institute, paper presentation", 
    "Department topper in academics",
    "NPTEL Certified in CAO (2024)",
    "English Lower & Higher Grade Typing Certificates"
  ];

  return (
    <section 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${aboutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about technology and committed to continuous learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <GraduationCap className="text-primary" size={32} />
              Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="skill-card p-6 hover-float">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <GraduationCap className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-primary mb-1">
                        {edu.institution}
                      </h4>
                      <p className="text-foreground font-medium mb-2">{edu.degree}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.location}
                        </span>
                        <span>{edu.duration}</span>
                        <span className="text-secondary font-medium">{edu.percentage}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          edu.status === 'Pursuing' 
                            ? 'bg-secondary/20 text-secondary' 
                            : 'bg-success/20 text-success'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements & Profile */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Award className="text-secondary" size={32} />
              Achievements
            </h3>

            <Card className="skill-card p-6 hover-float">
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-secondary/20 p-1 rounded-full mt-1">
                      <Award className="text-secondary" size={16} />
                    </div>
                    <span className="text-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Personal Info */}
            <Card className="skill-card p-6 hover-float">
              <h4 className="font-semibold text-lg mb-4 text-accent">Personal Details</h4>
              <div className="space-y-3 text-muted-foreground">
                <p><span className="text-foreground font-medium">Email:</span> ketharigayathri@gmail.com</p>
                <p><span className="text-foreground font-medium">Mobile:</span> +91-7989721137</p>
                <p><span className="text-foreground font-medium">Location:</span> Andhra Pradesh, India</p>
                <p><span className="text-foreground font-medium">Interests:</span> Drawing, Video Editing, Social Networking</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};