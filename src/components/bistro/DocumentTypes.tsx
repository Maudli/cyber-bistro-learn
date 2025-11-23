import { FileText, Flame, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const documentTypes = [
  {
    icon: FileText,
    title: 'Static Documents',
    subtitle: 'Pre-made Content',
    description: 'Like a bag of chips - stored exactly as created and sent unchanged to every client.',
    color: 'text-primary',
    glowClass: 'neon-glow',
  },
  {
    icon: Flame,
    title: 'Dynamic Documents',
    subtitle: 'Server-Side Magic',
    description: 'Like a burger - cooked fresh on demand using scripts (PHP, Python, Node.js) based on your order.',
    color: 'text-secondary',
    glowClass: 'neon-glow-pink',
  },
  {
    icon: Cpu,
    title: 'Active Documents',
    subtitle: 'Client-Side Power',
    description: 'Like a hibachi grill - the chef cooks at your table! JavaScript and applets run in your browser.',
    color: 'text-accent',
    glowClass: 'neon-glow',
  },
];

const DocumentTypes = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">The Kitchen</h2>
          <p className="text-lg text-muted-foreground">
            Different ways the web serves content - each with its own recipe
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {documentTypes.map((doc, index) => (
            <Card
              key={index}
              className={`glass-card p-8 transition-all duration-300 hover:scale-105 hover:${doc.glowClass} cursor-pointer group`}
            >
              <div className="text-center space-y-4">
                <div className={`inline-flex p-6 rounded-2xl bg-muted/30 ${doc.color} group-hover:animate-float`}>
                  <doc.icon className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h3 className={`text-2xl font-bold ${doc.color}`}>{doc.title}</h3>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {doc.subtitle}
                  </p>
                </div>
                
                <p className="text-foreground/80 leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentTypes;
