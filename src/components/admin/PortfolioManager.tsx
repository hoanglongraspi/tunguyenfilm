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
  Trash2, 
  Upload, 
  Eye, 
  Camera,
  Film,
  Image as ImageIcon,
  Save,
  X,
  Star,
  Calendar,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { portfolioService } from "@/lib/database-service";
import { Portfolio } from "@/lib/supabase";
import { Switch } from "@/components/ui/switch";
import { convertGoogleDriveUrl, isGoogleDriveUrl } from "@/lib/utils";

interface PortfolioManagerProps {
  category: "personal" | "commercial" | "events";
}

const PortfolioManager = ({ category }: PortfolioManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch portfolio items from Supabase
  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ['portfolio', category],
    queryFn: () => portfolioService.getAll(category),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: category,
    image_url: "",
    video_url: "",
    featured: false,
    status: "draft" as "published" | "draft",
    date: new Date().toISOString().split('T')[0]
  });

  // Mutations for CRUD operations
  const createMutation = useMutation({
    mutationFn: portfolioService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      toast({
        title: "Success",
        description: "Portfolio item created successfully.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create item: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Portfolio> }) =>
      portfolioService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      toast({
        title: "Success",
        description: "Portfolio item updated successfully.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update item: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: portfolioService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete item: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const getCategoryInfo = () => {
    switch (category) {
      case "personal":
        return { title: "Personal Projects", icon: Camera, color: "blue" };
      case "commercial":
        return { title: "Commercial Work", icon: Film, color: "orange" };
      case "events":
        return { title: "Events", icon: ImageIcon, color: "green" };
    }
  };

  const categoryInfo = getCategoryInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const portfolioData = {
      title: formData.title,
      description: formData.description,
      category: formData.category as "personal" | "commercial" | "events",
      image_url: formData.image_url,
      video_url: formData.video_url || undefined,
      date: formData.date,
      featured: formData.featured,
      status: formData.status
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, updates: portfolioData });
    } else {
      createMutation.mutate(portfolioData);
    }
  };

  const handleEdit = (item: Portfolio) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      image_url: item.image_url || "",
      video_url: item.video_url || "",
      featured: item.featured,
      status: item.status,
      date: item.date
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: category,
      image_url: "",
      video_url: "",
      featured: false,
      status: "draft",
      date: new Date().toISOString().split('T')[0]
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  if (error) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Data</h3>
            <p className="text-gray-400 mb-6">
              Failed to load portfolio items. Please check your Supabase configuration.
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
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <categoryInfo.icon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{categoryInfo.title}</h2>
            <p className="text-gray-400">
              Manage your {category} portfolio items ({items.length} total)
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setEditingItem(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New {category === "events" ? "Event" : "Project"}
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingItem ? "Edit" : "Add New"} {categoryInfo.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingItem ? "Update" : "Create a new"} portfolio item for your {category} category.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="text-white">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                    placeholder="Enter project description"
                  />
                </div>

                <div>
                  <Label htmlFor="image_url" className="text-white">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <Label htmlFor="video_url" className="text-white">Video URL (Optional)</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter video URL (Google Drive links supported)"
                  />
                  
                  {/* Help text for Google Drive URLs */}
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-gray-400">
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p><strong>Google Drive URLs:</strong> Paste any Google Drive sharing link - it will be automatically converted to embed format.</p>
                        <p className="mt-1">Examples:</p>
                        <ul className="list-disc list-inside ml-2 space-y-0.5">
                          <li>https://drive.google.com/file/d/FILE_ID/view?usp=sharing</li>
                          <li>https://drive.google.com/open?id=FILE_ID</li>
                          <li>https://drive.google.com/file/d/FILE_ID/edit</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Show converted URL preview for Google Drive links */}
                    {formData.video_url && isGoogleDriveUrl(formData.video_url) && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                        <p className="text-xs text-blue-400 font-medium">✅ Google Drive URL detected</p>
                        <p className="text-xs text-gray-300 mt-1">
                          Will be converted to: <span className="font-mono bg-gray-800 px-1 rounded">{convertGoogleDriveUrl(formData.video_url)}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="date" className="text-white">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status" className="text-white">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value as "published" | "draft"})}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="draft" className="text-white">Draft</SelectItem>
                      <SelectItem value="published" className="text-white">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                    />
                    <Label className="text-white">Featured Item</Label>
                  </div>
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
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
              <div className="aspect-video bg-gray-700 rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <categoryInfo.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No {categoryInfo.title} Yet</h3>
              <p className="text-gray-400 mb-6">
                Start building your portfolio by adding your first {category} project.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors group">
              <div className="relative aspect-video rounded-t-lg overflow-hidden">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=240&fit=crop&crop=center`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(item)}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500/80 hover:bg-red-500 text-white"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status and Featured badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {item.featured && (
                    <span className="px-2 py-1 bg-yellow-500/80 text-yellow-900 text-xs rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'published' 
                      ? 'bg-green-500/80 text-green-900' 
                      : 'bg-gray-500/80 text-gray-900'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  {item.video_url && (
                    <div className="flex items-center gap-1">
                      <Film className="w-3 h-3" />
                      Video
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager; 