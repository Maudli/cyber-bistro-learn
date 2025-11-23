import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Resource {
  id: string;
  name: string;
  url: string;
}

const AdminPanel = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bistro-resources');
    if (saved) {
      setResources(JSON.parse(saved));
    }
  }, []);

  const saveResources = (updatedResources: Resource[]) => {
    localStorage.setItem('bistro-resources', JSON.stringify(updatedResources));
    setResources(updatedResources);
  };

  const addResource = () => {
    if (!newName || !newUrl) {
      toast.error('Please fill in both fields');
      return;
    }

    const resource: Resource = {
      id: Date.now().toString(),
      name: newName,
      url: newUrl,
    };

    const updated = [...resources, resource];
    saveResources(updated);
    setNewName('');
    setNewUrl('');
    toast.success('Resource added!');
  };

  const removeResource = (id: string) => {
    const updated = resources.filter((r) => r.id !== id);
    saveResources(updated);
    toast.success('Resource removed');
  };

  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">Teacher Admin Panel</h2>
          <p className="text-lg text-muted-foreground">
            Add external resources for students to explore
          </p>
        </div>

        <Card className="glass-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Resource Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., MDN Web Docs"
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                className="bg-muted/50"
              />
            </div>
          </div>

          <Button onClick={addResource} className="w-full neon-glow bg-primary hover:bg-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>

          {resources.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-border/50">
              <h3 className="text-lg font-semibold text-foreground">Saved Resources</h3>
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="glass-card p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors flex-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-medium">{resource.name}</span>
                    </a>
                    <Button
                      onClick={() => removeResource(resource.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default AdminPanel;
