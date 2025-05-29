import { Film, ArrowLeft, ChevronRight, Play, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CommercialWork = () => {
  const navigate = useNavigate();
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; alt: string } | null>(null);

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
        </div>
      </div>
    </div>
  );
};

export default CommercialWork; 