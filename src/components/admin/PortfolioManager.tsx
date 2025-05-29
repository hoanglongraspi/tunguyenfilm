import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
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
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: "personal" | "commercial" | "events";
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  date: string;
  featured: boolean;
  status: "published" | "draft";
}

interface PortfolioManagerProps {
  category: "personal" | "commercial" | "events";
}

const PortfolioManager = ({ category }: PortfolioManagerProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "Creative Portrait Series",
      description: "A collection of artistic portraits showcasing unique lighting techniques",
      category: "personal",
      imageUrl: "/images/portfolio/personal-1.jpg",
      videoUrl: "/videos/personal-1.mp4",
      tags: ["portrait", "artistic", "lighting"],
      date: "2024-01-15",
      featured: true,
      status: "published"
    },
    {
      id: "2",
      title: "Brand Campaign - Tech Company",
      description: "Corporate video production for a leading tech company's product launch",
      category: "commercial",
      imageUrl: "/images/portfolio/commercial-1.jpg",
      videoUrl: "/videos/commercial-1.mp4",
      tags: ["corporate", "tech", "product launch"],
      date: "2024-01-20",
      featured: true,
      status: "published"
    },
    {
      id: "3",
      title: "Wedding - Sarah & Mike",
      description: "Beautiful wedding ceremony and reception coverage",
      category: "events",
      imageUrl: "/images/portfolio/wedding-1.jpg",
      videoUrl: "/videos/wedding-1.mp4",
      tags: ["wedding", "ceremony", "reception"],
      date: "2024-01-25",
      featured: false,
      status: "published"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: category,
    imageUrl: "",
    videoUrl: "",
    tags: "",
    featured: false,
    status: "draft" as "published" | "draft"
  });

  const filteredItems = items.filter(item => item.category === category);

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
    
    const newItem: PortfolioItem = {
      id: editingItem?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category as "personal" | "commercial" | "events",
      imageUrl: formData.imageUrl,
      videoUrl: formData.videoUrl || undefined,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      date: editingItem?.date || new Date().toISOString().split('T')[0],
      featured: formData.featured,
      status: formData.status
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
      toast({
        title: "Updated successfully",
        description: "Portfolio item has been updated.",
      });
    } else {
      setItems([...items, newItem]);
      toast({
        title: "Added successfully",
        description: "New portfolio item has been added.",
      });
    }

    resetForm();
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl || "",
      tags: item.tags.join(", "),
      featured: item.featured,
      status: item.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Deleted successfully",
      description: "Portfolio item has been deleted.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: category,
      imageUrl: "",
      videoUrl: "",
      tags: "",
      featured: false,
      status: "draft"
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-${categoryInfo.color}-500/20 rounded-xl flex items-center justify-center`}>
            <categoryInfo.icon className={`w-6 h-6 text-${categoryInfo.color}-400`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{categoryInfo.title}</h2>
            <p className="text-gray-400">Manage your {category} portfolio items</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className={`bg-${categoryInfo.color}-600 hover:bg-${categoryInfo.color}-700 text-white`}
              onClick={() => setEditingItem(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "published" | "draft") => setFormData({...formData, status: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="/images/portfolio/..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="/videos/portfolio/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="photography, portrait, creative"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured item</Label>
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className={`bg-${categoryInfo.color}-600 hover:bg-${categoryInfo.color}-700 flex-1`}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{filteredItems.length}</p>
              <p className="text-sm text-gray-400">Total Items</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{filteredItems.filter(item => item.status === "published").length}</p>
              <p className="text-sm text-gray-400">Published</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{filteredItems.filter(item => item.status === "draft").length}</p>
              <p className="text-sm text-gray-400">Drafts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{filteredItems.filter(item => item.featured).length}</p>
              <p className="text-sm text-gray-400">Featured</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <div className="aspect-video bg-gray-700 relative">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <categoryInfo.icon className={`w-12 h-12 text-${categoryInfo.color}-400`} />
                </div>
              )}
              
              {item.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </div>
              )}
              
              <div className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                item.status === "published" 
                  ? "bg-green-500 text-white" 
                  : "bg-yellow-500 text-black"
              }`}>
                {item.status}
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 bg-${categoryInfo.color}-500/20 text-${categoryInfo.color}-300 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-600 text-gray-300 rounded-full">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{item.date}</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:bg-blue-500/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-16">
            <div className="text-center">
              <categoryInfo.icon className={`w-16 h-16 text-${categoryInfo.color}-400 mx-auto mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-2">No {category} items yet</h3>
              <p className="text-gray-400 mb-6">
                Start by adding your first {category} portfolio item.
              </p>
              <Button 
                className={`bg-${categoryInfo.color}-600 hover:bg-${categoryInfo.color}-700`}
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PortfolioManager; 