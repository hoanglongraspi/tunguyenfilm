import { ArrowLeft, Play, Calendar, MapPin, Users, Star, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/lib/database-service";
import { convertGoogleDriveUrl } from "@/lib/utils";

const Events = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch events projects from CMS
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['portfolio', 'events'],
    queryFn: () => portfolioService.getAll('events', 'published'),
  });

  // Format project data for the UI
  const formatProjectForUI = (project) => ({
    id: project.id,
    title: project.title,
    description: project.description || "Sự kiện đặc biệt được ghi lại với chất lượng chuyên nghiệp, tạo nên những khoảnh khắc đáng nhớ.",
    videoUrl: project.video_url ? convertGoogleDriveUrl(project.video_url) : null,
    thumbnail: project.image_url || "/YEP_2025_TRAN_QUANG_3_01.jpg",
    year: new Date(project.date).getFullYear().toString(),
    date: project.date,
    duration: "4:20",
    category: "Events",
    status: project.status === 'published' ? "Published" : "Draft",
    featured: project.featured,
    location: "Hồ Chí Minh, Vietnam"
  });

  const formattedProjects = projects.map(formatProjectForUI);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Projects</h2>
          <p className="text-gray-400">Failed to load events projects. Please check your CMS configuration.</p>
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
            onClick={() => navigate('/')}
            variant="ghost" 
            className="text-white hover:bg-gray-800 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </Button>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-6">
          {/* Page Title */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Event Gallery</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Khám phá những dự án sự kiện đã thực hiện với chất lượng và sự sáng tạo
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
          )}

          {/* No Projects State */}
          {!isLoading && formattedProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700/50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Events Yet</h3>
              <p className="text-gray-400 mb-6">Add event projects through the CMS to see them here.</p>
              <Button 
                onClick={() => navigate('/admin')}
                className="bg-green-600 hover:bg-green-700"
              >
                Go to CMS
              </Button>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && formattedProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {formattedProjects.map((project) => (
                <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
                    {/* Project Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/YEP_2025_TRAN_QUANG_3_01.jpg';
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          {project.videoUrl ? <Play className="w-12 h-12 text-white" /> : <Heart className="w-12 h-12 text-white" />}
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
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">{project.year}</span>
                        <div className="text-gray-500">•</div>
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{project.location}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legacy Event Item - Keep if no CMS projects */}
          {!isLoading && formattedProjects.length === 0 && (
            <div className="max-w-full mx-auto px-4">
              <div className="grid lg:grid-cols-4 gap-20 items-start">
                {/* Video Section - Left */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl transform scale-105">
                    <iframe
                      src="https://drive.google.com/file/d/1p_70CHWbv02hdWpV4S99nBInglNm8kta/preview"
                      className="w-full h-full"
                      allow="autoplay"
                      title="Event Video"
                    ></iframe>
                  </div>
                </div>

                {/* Content Section - Right */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2 text-green-400">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Event Coverage</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Corporate Event
                    </h3>
                    
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Sự kiện doanh nghiệp được thực hiện với chất lượng chuyên nghiệp, 
                      ghi lại những khoảnh khắc quan trọng và tạo nên những thước phim ấn tượng.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-400">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <span>January 2025</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span>Hồ Chí Minh, Vietnam</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Dịch vụ đã thực hiện:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Quay phim sự kiện toàn bộ</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Chụp ảnh các khoảnh khắc quan trọng</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Hậu kỳ và chỉnh sửa chuyên nghiệp</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Highlight video và documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                    <Heart className="w-6 h-6 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">Event Details</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Description</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{selectedProject.description}</div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Location</div>
                      <div className="text-gray-300 text-sm">{selectedProject.location}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Event Date</div>
                      <div className="text-gray-300 text-sm">{new Date(selectedProject.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">Event Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Category</div>
                      <div className="text-gray-300 text-sm">{selectedProject.category}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Status</div>
                      <div className="text-gray-300 text-sm">{selectedProject.status}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-green-400 text-sm font-medium mb-1">Duration</div>
                      <div className="text-gray-300 text-sm">{selectedProject.duration}</div>
                    </div>

                    {selectedProject.featured && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <div className="text-yellow-400 text-sm font-medium">Featured Event</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events; 