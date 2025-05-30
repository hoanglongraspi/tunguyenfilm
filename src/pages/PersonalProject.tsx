import { Camera, ArrowLeft, ChevronRight, Play, Users, Award, Video, Calendar, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/lib/database-service";
import { convertGoogleDriveUrl } from "@/lib/utils";

const PersonalProject = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch personal projects from CMS
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['portfolio', 'personal'],
    queryFn: () => portfolioService.getAll('personal', 'published'),
  });

  // Format project data for the UI
  const formatProjectForUI = (project) => ({
    id: project.id,
    title: project.title,
    description: project.description || "Dự án cá nhân độc đáo, thể hiện phong cách nghệ thuật và tầm nhìn sáng tạo.",
    videoUrl: project.video_url ? convertGoogleDriveUrl(project.video_url) : null,
    thumbnail: project.image_url || "/project-thumbnail.png",
    year: new Date(project.date).getFullYear().toString(),
    date: project.date,
    duration: "5:30", // You can add this to CMS later
    category: "Personal Project",
    status: project.status === 'published' ? "Published" : "Draft",
    featured: project.featured
  });

  const formattedProjects = projects.map(formatProjectForUI);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Projects</h2>
          <p className="text-gray-400">Failed to load personal projects. Please check your CMS configuration.</p>
          <Button 
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            variant="ghost" 
            className="text-white hover:bg-gray-800 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </Button>
          <h1 className="text-2xl font-bold text-white">Personal Projects</h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-6">
          {/* Gallery Header */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <Camera className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Personal Project Gallery</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Bộ sưu tập các dự án cá nhân độc đáo, thể hiện phong cách nghệ thuật và tầm nhìn sáng tạo của chúng tôi.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center mb-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-700"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Projects State */}
          {!isLoading && formattedProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700/50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Personal Projects Yet</h3>
              <p className="text-gray-400 mb-6">Add some personal projects through the CMS to see them here.</p>
              <Button 
                onClick={() => navigate('/admin')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go to CMS
              </Button>
            </div>
          )}

          {/* Projects Gallery Grid */}
          {!isLoading && formattedProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {formattedProjects.map((project) => (
                <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    {/* Project Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/project-thumbnail.png';
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          {project.videoUrl ? <Play className="w-12 h-12 text-white" /> : <Camera className="w-12 h-12 text-white" />}
                        </div>
                      </div>

                      {/* Project Info Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-white text-sm font-medium">{project.category}</span>
                        </div>
                        <div className={`backdrop-blur-sm rounded-lg px-3 py-1 ${project.status === 'Published' ? 'bg-green-600/80' : 'bg-yellow-600/80'}`}>
                          <span className="text-white text-sm font-medium">{project.status}</span>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500/80 backdrop-blur-sm rounded-lg px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-white" />
                            <span className="text-white text-xs font-medium">Featured</span>
                          </div>
                        </div>
                      )}

                      {/* Duration */}
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium">{project.duration}</span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">{project.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              <Button 
                onClick={() => setSelectedProject(null)}
                variant="ghost" 
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Video or Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-8">
                {selectedProject.videoUrl ? (
                  <iframe
                    src={selectedProject.videoUrl}
                    className="w-full h-full rounded-2xl"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                ) : (
                  <img 
                    src={selectedProject.thumbnail} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Project Details</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-blue-400 text-sm font-medium mb-1">Description</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{selectedProject.description}</div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-blue-400 text-sm font-medium mb-1">Project Date</div>
                      <div className="text-gray-300 text-sm">{new Date(selectedProject.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Project Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-blue-400 text-sm font-medium mb-1">Category</div>
                      <div className="text-gray-300 text-sm">{selectedProject.category}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-blue-400 text-sm font-medium mb-1">Status</div>
                      <div className="text-gray-300 text-sm">{selectedProject.status}</div>
                    </div>

                    {selectedProject.featured && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <div className="text-yellow-400 text-sm font-medium">Featured Project</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-700/50">
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{selectedProject.year}</div>
                  <div className="text-gray-400 text-sm">Production Year</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{selectedProject.duration}</div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{selectedProject.category}</div>
                  <div className="text-gray-400 text-sm">Category</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalProject; 