import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Trash2, 
  Search,
  Filter,
  Download,
  Eye,
  File,
  X,
  CloudUpload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mediaService } from "@/lib/database-service";
import { Media } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MediaLibrary = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch media files
  const { data: mediaFiles = [], isLoading, error } = useQuery({
    queryKey: ['media'],
    queryFn: mediaService.getAll,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setIsUploading(true);
      return await mediaService.upload(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      toast({
        title: "Success",
        description: "File uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: `Failed to upload file: ${error.message}`,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: mediaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      toast({
        title: "Success",
        description: "File deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: `Failed to delete file: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        // Validate file type
        const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
        if (!isValidType) {
          toast({
            title: "Invalid File Type",
            description: "Please upload only image or video files.",
            variant: "destructive",
          });
          return;
        }

        // Validate file size (50MB max)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          toast({
            title: "File Too Large",
            description: "Please upload files smaller than 50MB.",
            variant: "destructive",
          });
          return;
        }

        uploadMutation.mutate(file);
      });
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string, filename: string) => {
    if (confirm(`Are you sure you want to delete "${filename}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaFiles.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || media.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: mediaFiles.length,
    images: mediaFiles.filter(m => m.type === 'image').length,
    videos: mediaFiles.filter(m => m.type === 'video').length,
    totalSize: mediaFiles.reduce((acc, m) => acc + (m.size || 0), 0)
  };

  if (error) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Media</h3>
            <p className="text-gray-400 mb-6">
              Failed to load media files. Please check your Supabase configuration.
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
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Media Library</h2>
            <p className="text-gray-400">Upload and manage your media files</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Files</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{stats.images}</p>
              <p className="text-sm text-gray-400">Images</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{stats.videos}</p>
              <p className="text-sm text-gray-400">Videos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{formatFileSize(stats.totalSize)}</p>
              <p className="text-sm text-gray-400">Total Size</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-white pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {["all", "image", "video"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type as typeof filterType)}
              className={
                filterType === type 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              <Filter className="w-3 h-3 mr-1" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Upload Drop Zone */}
      {mediaFiles.length === 0 && !isLoading && (
        <Card className="bg-gray-800/50 border-gray-700 border-dashed">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <CloudUpload className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Media Files Yet</h3>
              <p className="text-gray-400 mb-6">
                Upload your first images and videos to get started.
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
              <div className="aspect-square bg-gray-700 rounded-t-lg" />
              <CardContent className="p-3">
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMedia.map((media) => (
            <Card key={media.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors group">
              <div className="relative aspect-square rounded-t-lg overflow-hidden">
                {media.type === 'image' ? (
                  <img 
                    src={media.url} 
                    alt={media.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setSelectedMedia(media)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop&crop=center`;
                    }}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-gray-700 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedMedia(media)}
                  >
                    <Video className="w-12 h-12 text-purple-400" />
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedMedia(media)}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(media.url, '_blank')}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(media.id, media.name)}
                    className="bg-red-500/80 hover:bg-red-500 text-white"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Type indicator */}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full flex items-center gap-1">
                    {media.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    {media.type}
                  </span>
                </div>
              </div>

              <CardContent className="p-3">
                <h3 className="text-sm font-medium text-white mb-1 truncate" title={media.name}>
                  {media.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatFileSize(media.size || 0)}</span>
                  <span>{new Date(media.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Media Preview Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedMedia?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Preview and manage media file details
            </DialogDescription>
          </DialogHeader>
          
          {selectedMedia && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                {selectedMedia.type === 'image' ? (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.name}
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <video 
                    src={selectedMedia.url} 
                    controls
                    className="w-full max-h-96"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">File Name:</p>
                  <p className="text-white">{selectedMedia.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Type:</p>
                  <p className="text-white">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Size:</p>
                  <p className="text-white">{formatFileSize(selectedMedia.size || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Upload Date:</p>
                  <p className="text-white">{new Date(selectedMedia.created_at).toLocaleString()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400">URL:</p>
                  <p className="text-white text-xs break-all">{selectedMedia.url}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMedia.url);
                    toast({ title: "Copied!", description: "URL copied to clipboard." });
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Copy URL
                </Button>
                <Button
                  onClick={() => window.open(selectedMedia.url, '_blank')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaLibrary; 