import { Camera, ArrowLeft, ChevronRight, Play, Users, Award, Video, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PersonalProject = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  // Projects data - easy to add more projects here
  const projects = [
    {
      id: 1,
      title: "Personal Project 2024",
      description: "Khám phá dự án cá nhân độc đáo, thể hiện phong cách nghệ thuật và tầm nhìn sáng tạo.",
      videoUrl: "https://drive.google.com/file/d/1pNbZ3MOjx-9w5QSriVEl5qesuuY-JbBU/preview",
      thumbnail: "/project-thumbnail.png",
      year: "2024",
      duration: "5:30",
      category: "Short Film",
      status: "Completed",
      credits: {
        "Director": "Nguyễn Đức Cảnh",
        "Biên kịch": "Mai Dũng", 
        "AD": "Kelly Phan",
        "Producer": "Phạm Gia Bảo",
        "DOP": "Liêm Nguyễn",
        "AC": "Phúc Đức",
        "CamOP": "Tú Nguyễn, Sơn Lê",
        "Editor": "Vu Tuan Anh", 
        "Colorist": "Võ Minh Đức",
        "Soundman": "Lê Thông",
        "Gaffer": "Võ Đức Trường",
        "Drone": "Anh Huỳnh",
        "BTS": "Hồng Đức, Bế Minh Quân",
        "Diễn viên": "Trần Minh Hiếu, Mẫn Mẫn, Thenn Trútt, Thanh Yu, Luong Huy, Gioi Lee, Hồ Bảo Kha và các bé...."
      }
    }
    // Easy to add more projects here:
    // {
    //   id: 2,
    //   title: "Another Project",
    //   description: "Description of another project...",
    //   videoUrl: "...",
    //   // ... other properties
    // }
  ];

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

          {/* Projects Gallery Grid */}
          <div className="flex justify-center mb-16">
            <div className="max-w-md w-full">
              {projects.map((project) => (
                <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    {/* Project Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Project Info Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-white text-sm font-medium">{project.category}</span>
                        </div>
                        <div className="bg-green-600/80 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-white text-sm font-medium">{project.status}</span>
                        </div>
                      </div>

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
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">{Object.keys(project.credits).length} members</span>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              {/* Video */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-8">
                <iframe
                  src={selectedProject.videoUrl}
                  className="w-full h-full rounded-2xl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Project Credits</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(selectedProject.credits).slice(0, Math.ceil(Object.entries(selectedProject.credits).length / 2)).map(([role, name]) => (
                      <div key={role} className="flex items-start space-x-4 p-3 bg-gray-800/30 rounded-lg">
                        <div className="w-20 text-blue-400 text-sm font-medium flex-shrink-0">{role}:</div>
                        <div className="text-gray-300 text-sm">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Credits */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Production Team</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(selectedProject.credits).slice(Math.ceil(Object.entries(selectedProject.credits).length / 2)).map(([role, name]) => (
                      <div key={role} className="flex items-start space-x-4 p-3 bg-gray-800/30 rounded-lg">
                        <div className="w-20 text-blue-400 text-sm font-medium flex-shrink-0">{role}:</div>
                        <div className="text-gray-300 text-sm">{name}</div>
              </div>
            ))}
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
                  <div className="text-2xl font-bold text-blue-400">{Object.keys(selectedProject.credits).length}</div>
                  <div className="text-gray-400 text-sm">Team Members</div>
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