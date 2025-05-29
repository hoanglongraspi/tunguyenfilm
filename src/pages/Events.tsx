import { ArrowLeft, Play, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

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
            <h2 className="text-4xl font-bold text-white mb-4">Event Gallery</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Khám phá những dự án sự kiện đã thực hiện với chất lượng và sự sáng tạo
            </p>
          </div>

          {/* Event Item */}
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

                {/* <div className="pt-6">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium">
                    Liên hệ để đặt lịch
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 