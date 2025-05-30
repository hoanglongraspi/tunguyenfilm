import { Film, ArrowLeft, ChevronRight, Play, ChevronDown, ChevronUp, X, Star, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/lib/database-service";
import { convertGoogleDriveUrl } from "@/lib/utils";

const CommercialWork = () => {
  const navigate = useNavigate();
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; alt: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch commercial projects from CMS
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['portfolio', 'commercial'],
    queryFn: () => portfolioService.getAll('commercial', 'published'),
  });

  // Format project data for the UI
  const formatProjectForUI = (project) => ({
    id: project.id,
    title: project.title,
    description: project.description || "Dự án thương mại chuyên nghiệp, tạo ra nội dung quảng cáo và brand content có tác động mạnh mẽ.",
    videoUrl: project.video_url ? convertGoogleDriveUrl(project.video_url) : null,
    thumbnail: project.image_url || "/PTSCHaiPhong7.jpg",
    year: new Date(project.date).getFullYear().toString(),
    date: project.date,
    duration: "3:45",
    category: "Commercial",
    status: project.status === 'published' ? "Published" : "Draft",
    featured: project.featured,
    client: project.client || "Corporate Client"
  });

  const formattedProjects = projects.map(formatProjectForUI);

  const togglePartner = (partnerId: string) => {
    setExpandedPartner(expandedPartner === partnerId ? null : partnerId);
  };

  const openImageModal = (imageSrc: string, imageTitle: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, title: imageTitle, alt: imageAlt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const galleryImages = [
    { name: "PTSCHaiPhong7.jpg", title: "Industrial Operations" },
    { name: "PTSCHaiPhong18.jpg", title: "Manufacturing Process" },
    { name: "PTSCHaiPhong32.jpg", title: "Technical Excellence" },
    { name: "PTSCHaiPhong69.jpg", title: "Quality Control" },
    { name: "PTSCHaiPhong75.jpg", title: "Professional Team" }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Projects</h2>
          <p className="text-gray-400">Failed to load commercial projects. Please check your CMS configuration.</p>
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
      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3 border border-orange-400/30">
                <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                <p className="text-orange-300 text-sm">PTSC Hải Phòng</p>
              </div>
            </div>
            
            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeImageModal}
            ></div>
          </div>
        </div>
      )}

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
          <h1 className="text-2xl font-bold text-white">Commercial Work</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen py-16 relative">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/PTSCHaiPhong7.jpg"
            alt="PTSC Hai Phong Industrial Operations"
            className="w-full h-full object-cover"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/10">
              <Film className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Commercial Work</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Chuyên nghiệp trong việc tạo ra nội dung quảng cáo, corporate video và brand content. 
              Chúng tôi hiểu rõ nhu cầu của doanh nghiệp và tạo ra những sản phẩm có tác động mạnh mẽ.
            </p>
          </div>

          {/* Partnerships Section */}
          <div className="mb-20">
            {/* <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-blue-600/20 px-6 py-2 rounded-full border border-orange-400/30 mb-6">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-300 text-sm font-medium tracking-wide uppercase">Strategic Partnerships</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-4">
                Đối tác chiến lược
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                Tự hào được tin tượng bởi các tập đoàn hàng đầu trong nhiều ngành nghề tại Việt Nam
              </p>
            </div> */}

            {/* Partners List */}
            <div className="space-y-6">
              {/* PTSC Partnership */}
              <div className="relative">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-blue-600/10 to-orange-500/10 rounded-3xl blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-blue-600/5 rounded-3xl"></div>
                
                {/* Main Container */}
                <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-800/60 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gradient-to-r border-orange-400/20 overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5 animate-pulse"></div>
                  
                  {/* Partner Header - Clickable */}
                  <div 
                    className="relative p-8 cursor-pointer group"
                    onClick={() => togglePartner('ptsc')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Partner Logo */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-blue-500 to-orange-400 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-all duration-500"></div>
                          <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 group-hover:border-orange-400/50 transition-all duration-500 transform group-hover:scale-105">
                            <img 
                              src="/ptsc-logo.png" 
                              alt="PTSC - Petroleum Technical Services Corporation"
                              className="h-12 w-auto filter brightness-95 group-hover:brightness-110 transition-all duration-500"
                            />
                          </div>
                        </div>
                        
                        {/* Partner Info */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-xl font-bold text-white">PTSC</h4>
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/30 to-blue-600/30 px-3 py-1 rounded-full border border-orange-400/40">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-white text-xs font-semibold">Strategic Partner</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm font-medium">Petroleum Technical Services Corporation</p>
                          <p className="text-orange-300 text-xs">A member of PetroVietnam Group</p>
                        </div>
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-white text-sm font-medium">Hơn 5 năm hợp tác</p>
                          <p className="text-gray-400 text-xs">Ngành dầu khí</p>
                        </div>
                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/30 group-hover:border-orange-400/50 transition-all duration-300">
                          {expandedPartner === 'ptsc' ? (
                            <ChevronUp className="w-4 h-4 text-orange-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-orange-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {expandedPartner === 'ptsc' && (
                    <div className="border-t border-white/10 p-8 animate-in slide-in-from-top duration-300">
                      {/* Featured PTSC Project Video */}
                      <div className="mb-8">
                        <div className="text-center mb-6">
                          <h5 className="text-xl font-bold text-white mb-2">Dự án nổi bật với PTSC</h5>
                          <p className="text-gray-400 text-sm">Khám phá video thương mại chuyên nghiệp được thực hiện cho PTSC</p>
                        </div>
                        
                        <div className="max-w-4xl mx-auto">
                          <div className="relative group">
                            {/* Video Container with Enhanced Styling */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-orange-400/20 group-hover:border-orange-400/40 transition-all duration-500">
                              {/* Glowing Border Effect */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 via-blue-500/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
                              
                              {/* Video Iframe */}
                              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <iframe
                                  src="https://drive.google.com/file/d/1Fm-rXnxqIoQfQx386_IPsFBaEzsP5VbF/preview"
                                  className="w-full h-full rounded-2xl"
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                  style={{ border: 'none' }}
                                />
                              </div>
                              
                              {/* Video Info Overlay */}
                              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-400/30">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                  <span className="text-white text-sm font-medium">PTSC Commercial</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Video Details */}
                            <div className="mt-6 text-center">
                              <div className="inline-flex items-center space-x-4 bg-white/5 rounded-full px-6 py-3 border border-white/10">
                                <div className="flex items-center space-x-2">
                                  <Film className="w-4 h-4 text-orange-400" />
                                  <span className="text-gray-300 text-sm">Corporate Video</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center space-x-2">
                                  <Play className="w-4 h-4 text-blue-400" />
                                  <span className="text-gray-300 text-sm">Professional Production</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center space-x-2">
                                  <ChevronRight className="w-4 h-4 text-green-400" />
                                  <span className="text-gray-300 text-sm">2024</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* PTSC Project Gallery */}
                      <div className="mb-8">
                        <div className="text-center mb-6">
                          <h5 className="text-xl font-bold text-white mb-2">Hình ảnh dự án PTSC Hải Phòng</h5>
                          <p className="text-gray-400 text-sm">Bộ sưu tập hình ảnh chất lượng cao từ các hoạt động sản xuất tại PTSC Hải Phòng</p>
                        </div>
                        
                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {galleryImages.map((image, index) => (
                            <div key={index} className="group relative cursor-pointer">
                              <div 
                                className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 group-hover:border-orange-400/40 transition-all duration-300"
                                onClick={() => openImageModal(`/${image.name}`, image.title, `PTSC Hai Phong - ${image.title}`)}
                              >
                                {/* Image */}
                                <img
                                  src={`/${image.name}`}
                                  alt={`PTSC Hai Phong - ${image.title}`}
                                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white text-xs font-medium">{image.title}</p>
                                    <p className="text-orange-300 text-xs">PTSC Hải Phòng</p>
                                  </div>
                                </div>
                                
                                {/* Hover Icon */}
                                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                  <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                                
                                {/* Number Badge */}
                                <div className="absolute top-2 left-2 w-6 h-6 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                  <span className="text-white text-xs font-semibold">{index + 1}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Gallery Footer */}
                        <div className="mt-6 text-center">
                          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500/10 to-blue-600/10 px-6 py-3 rounded-full border border-orange-400/20">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">Professional Photos</span>
                            </div>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">Industrial Documentation</span>
                            </div>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">High Resolution</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Accent */}
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                          <div className="w-8 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                          <span>✨ Đối tác tin cậy trong mọi dự án</span>
                          <div className="w-8 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Partners - Placeholders */}
              

              
            </div>
          </div>

          {/* CMS Commercial Projects Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-blue-600/20 px-6 py-2 rounded-full border border-orange-400/30 mb-6">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-300 text-sm font-medium tracking-wide uppercase">Portfolio</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-4">
                Commercial Projects
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                Khám phá các dự án thương mại chuyên nghiệp được thực hiện bởi đội ngũ của chúng tôi
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
                  <Building className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Commercial Projects Yet</h3>
                <p className="text-gray-400 mb-6">Add commercial projects through the CMS to see them here.</p>
                <Button 
                  onClick={() => navigate('/admin')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Go to CMS
                </Button>
              </div>
            )}

            {/* Projects Grid */}
            {!isLoading && formattedProjects.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {formattedProjects.map((project) => (
                  <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
                      {/* Project Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/PTSCHaiPhong7.jpg';
                          }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            {project.videoUrl ? <Play className="w-12 h-12 text-white" /> : <Building className="w-12 h-12 text-white" />}
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
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span className="text-orange-400 text-sm font-medium">{project.year}</span>
                          <div className="text-gray-500">•</div>
                          <span className="text-gray-400 text-sm">{project.client}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
                    <Building className="w-6 h-6 text-orange-400" />
                    <h3 className="text-2xl font-bold text-white">Project Details</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Description</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{selectedProject.description}</div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Client</div>
                      <div className="text-gray-300 text-sm">{selectedProject.client}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Project Date</div>
                      <div className="text-gray-300 text-sm">{new Date(selectedProject.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Film className="w-6 h-6 text-orange-400" />
                    <h3 className="text-2xl font-bold text-white">Commercial Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Category</div>
                      <div className="text-gray-300 text-sm">{selectedProject.category}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Status</div>
                      <div className="text-gray-300 text-sm">{selectedProject.status}</div>
                    </div>

                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="text-orange-400 text-sm font-medium mb-1">Duration</div>
                      <div className="text-gray-300 text-sm">{selectedProject.duration}</div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-700/50">
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{selectedProject.year}</div>
                  <div className="text-gray-400 text-sm">Year</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{selectedProject.duration}</div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{selectedProject.category}</div>
                  <div className="text-gray-400 text-sm">Type</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommercialWork; 