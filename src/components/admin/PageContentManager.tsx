import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Save,
  X,
  Globe,
  Type,
  Image as ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pageService } from "@/lib/database-service";
import { PageContent } from "@/lib/supabase";

const PageContentManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch page content
  const { data: homeContent = [], isLoading, error } = useQuery({
    queryKey: ['page-content', 'home'],
    queryFn: () => pageService.getPageContent('home'),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    page_name: "home",
    section: "",
    title: "",
    content: "",
    type: "text" as "text" | "html" | "json"
  });

  // Mutation for creating/updating content
  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingItem) {
        return await pageService.updateContent(data.page_name, data.section, {
          title: data.title,
          content: data.content,
          type: data.type
        });
      } else {
        return await pageService.createContent(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
      toast({
        title: "Success",
        description: editingItem ? "Content updated successfully." : "Content created successfully.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to save content: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const handleEdit = (item: PageContent) => {
    setEditingItem(item);
    setFormData({
      page_name: item.page_name,
      section: item.section,
      title: item.title || "",
      content: item.content,
      type: item.type
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      page_name: "home",
      section: "",
      title: "",
      content: "",
      type: "text"
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  // Predefined content sections for the landing page
  const predefinedSections = [
    { id: "hero-title", label: "Hero Title", description: "Main headline on homepage" },
    { id: "hero-subtitle", label: "Hero Subtitle", description: "Secondary text under main title" },
    { id: "about-title", label: "About Title", description: "About section heading" },
    { id: "about-text", label: "About Text", description: "About section content" },
    { id: "services-title", label: "Services Title", description: "Services section heading" },
    { id: "services-text", label: "Services Text", description: "Services description" },
    { id: "contact-title", label: "Contact Title", description: "Contact section heading" },
    { id: "contact-text", label: "Contact Text", description: "Contact information" },
  ];

  if (error) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Content</h3>
            <p className="text-gray-400 mb-6">
              Failed to load page content. Please check your Supabase configuration.
            </p>
            <p className="text-red-400 text-sm">
              {error.message}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Landing Page Content</h2>
            <p className="text-gray-400">
              Manage your homepage content sections
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setEditingItem(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content Section
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingItem ? "Edit" : "Add"} Page Content
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingItem ? "Update" : "Create"} content for your landing page.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="section" className="text-white">Section *</Label>
                  <Select 
                    value={formData.section} 
                    onValueChange={(value) => setFormData({...formData, section: value})}
                    disabled={!!editingItem}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select a section" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {predefinedSections.map((section) => (
                        <SelectItem key={section.id} value={section.id} className="text-white">
                          <div>
                            <div className="font-medium">{section.label}</div>
                            <div className="text-xs text-gray-400">{section.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title" className="text-white">Title (Optional)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Section title"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-white">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white min-h-[150px]"
                    placeholder="Enter your content here..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-white">Content Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({...formData, type: value as "text" | "html" | "json"})}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="text" className="text-white">Plain Text</SelectItem>
                      <SelectItem value="html" className="text-white">HTML</SelectItem>
                      <SelectItem value="json" className="text-white">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={saveMutation.isPending || !formData.section || !formData.content}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Add Buttons for Common Sections */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Add Common Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {predefinedSections.map((section) => {
              const exists = homeContent.some(item => item.section === section.id);
              return (
                <Button
                  key={section.id}
                  variant={exists ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (exists) {
                      const existingContent = homeContent.find(item => item.section === section.id);
                      if (existingContent) handleEdit(existingContent);
                    } else {
                      setFormData({
                        page_name: "home",
                        section: section.id,
                        title: section.label,
                        content: "",
                        type: "text"
                      });
                      setIsDialogOpen(true);
                    }
                  }}
                  className={exists 
                    ? "border-green-500 text-green-300 hover:bg-green-500/20" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {exists ? <Edit className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                  {section.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Content */}
      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-20 bg-gray-700 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : homeContent.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Type className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Content Yet</h3>
              <p className="text-gray-400 mb-6">
                Start by adding content sections for your landing page.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Section
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {homeContent.map((item) => (
            <Card key={item.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-mono">
                        {item.section}
                      </span>
                      <span className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded">
                        {item.type}
                      </span>
                    </div>
                    {item.title && (
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                    )}
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {item.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Updated: {new Date(item.updated_at).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(item)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContentManager; 