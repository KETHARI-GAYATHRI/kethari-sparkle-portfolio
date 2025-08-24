import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, MapPin, Github, Download } from 'lucide-react';

export const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      label: "Email",
      value: "ketharigayathri@gmail.com",
      href: "mailto:ketharigayathri@gmail.com",
      description: "Send me an email for professional inquiries"
    },
    {
      icon: <Phone className="text-secondary" size={24} />,
      label: "Mobile",
      value: "+91-7989721137",
      href: "tel:+917989721137",
      description: "Call or text for quick communication"
    },
    {
      icon: <Linkedin className="text-accent" size={24} />,
      label: "LinkedIn",
      value: "linkedin.com/in/kethari-gayathri-4b8a83318",
      href: "https://linkedin.com/in/kethari-gayathri-4b8a83318",
      description: "Connect with me professionally"
    },
    {
      icon: <MapPin className="text-tertiary" size={24} />,
      label: "Location",
      value: "Andhra Pradesh, India",
      href: null,
      description: "Available for remote work and relocation"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start my career journey. Let's connect and explore opportunities together!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <Card 
              key={index}
              className="skill-card p-6 hover-float bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-background/20">
                  {contact.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg text-foreground">{contact.label}</h3>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block text-primary hover:text-primary-glow transition-colors duration-300 font-medium break-all"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{contact.value}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="skill-card p-8 hover-float bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold gradient-text">Let's Work Together</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm actively seeking entry-level opportunities in software development, 
              web development, or related technical roles. I'm excited to contribute 
              to innovative projects and grow with the right team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover-float hover-glow px-8"
                asChild
              >
                <a href="mailto:ketharigayathri@gmail.com">
                  <Mail size={20} className="mr-2" />
                  Send Email
                </a>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/60 hover-float px-8"
                asChild
              >
                <a 
                  href="https://linkedin.com/in/kethari-gayathri-4b8a83318" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} className="mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 hover-float px-8"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="skill-card p-6 bg-gradient-to-br from-accent/5 to-tertiary/5 border-accent/20">
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">Available for:</span> Full-time positions, 
              Remote work, Relocation opportunities, Freelance projects, and Collaborative learning experiences.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};