import { Camera, Film, Video, Image, ChevronRight, Mail, Phone, Play, X, ArrowLeft, Globe, Maximize, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('vi');
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Background images for slideshow
  const backgroundImages = [
    '/ẢNH BÌA CTY.png',
    '/DSC01742.jpg', 
    '/DSCF3135.jpg'
  ];

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Language content object
  const content = {
    vi: {
      nav: {
        home: 'Trang chủ',
        about: 'Về chúng tôi', 
        contact: 'Liên hệ'
      },
      hero: {
        badge: 'Photographer / Videographer',
        title: 'Tú Nguyễn Film',
        description: 'Chuyên quay phim, chụp ảnh sự kiện, cưới hỏi và quảng cáo với phong cách chuyên nghiệp, cảm xúc và sáng tạo.',
        viewPortfolio: 'Xem Portfolio',
        contact: 'Liên hệ',
        demoReel: 'Demo Reel'
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Khám phá những dự án đã thực hiện với chất lượng và sự sáng tạo',
        personal: {
          title: 'Personal Project',
          description: 'Những dự án cá nhân, nghệ thuật và sáng tạo',
          button: 'Xem thêm'
        },
        commercial: {
          title: 'Commercial Work', 
          description: 'Quảng cáo, corporate video và brand content',
          button: 'Xem thêm'
        },
        events: {
          title: 'Events',
          description: 'Cưới hỏi, sự kiện và những khoảnh khắc đặc biệt',
          button: 'Xem thêm'
        }
      },
      contact: {
        title: 'Liên hệ hợp tác',
        subtitle: 'Sẵn sàng biến ý tưởng của bạn thành hiện thực'
      },
      footer: {
        title: 'TN Films',
        // description: 'Chuyên gia trong lĩnh vực quay phim và chụp ảnh với hơn 5 năm kinh nghiệm. Chúng tôi mang đến những khoảnh khắc đẹp nhất cho bạn.',
        servicesTitle: 'Liên hệ',
        services: [
          'Email: tu.nguyenfilm@gmail.com',
          'TuNguyen Film fanpage: https://www.facebook.com/TuNguyenFilm', 
          '+84123456789'
        ],
        copyright: '© 2024 Tú Nguyễn Film. All rights reserved.'
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About Us',
        contact: 'Contact'
      },
      hero: {
        badge: 'Photographer / Videographer',
        title: 'Tu Nguyen Film',
        description: 'Specializing in professional, emotional and creative videography and photography for events, weddings and advertising.',
        viewPortfolio: 'View Portfolio',
        contact: 'Contact',
        demoReel: 'Demo Reel'
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Explore projects completed with quality and creativity',
        personal: {
          title: 'Personal Project',
          description: 'Personal, artistic and creative projects',
          button: 'View More'
        },
        commercial: {
          title: 'Commercial Work',
          description: 'Advertising, corporate video and brand content',
          button: 'View More'
        },
        events: {
          title: 'Events', 
          description: 'Weddings, events and special moments',
          button: 'View More'
        }
      },
      contact: {
        title: 'Contact & Collaboration',
        subtitle: 'Ready to turn your ideas into reality'
      },
      footer: {
        title: 'TN Films',
        description: 'Expert in videography and photography with over 5 years of experience. We bring you the most beautiful moments.',
        servicesTitle: 'Contact',
        services: [
          'Email: tu.nguyenfilm@gmail.com',
          'TuNguyen Film fanpage: https://www.facebook.com/TuNguyenFilm',
          '+84123456789'
        ],
        copyright: '© 2024 Tu Nguyen Film. All rights reserved.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg z-50 border-b border-gray-800/30 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/logo_transparent.png" 
                alt="TN Films Logo" 
                className="h-20 w-auto hover:scale-105 transition-all duration-300 cursor-pointer filter drop-shadow-lg hover:drop-shadow-2xl"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors font-medium">
                {t.nav.home}
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">
                {t.nav.about}
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors font-medium">
                {t.nav.contact}
              </a>
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-3 py-2 transition-colors duration-300"
                >
                  <span className={`text-sm font-medium ${language === 'vi' ? 'text-white' : 'text-gray-400'}`}>
                    VI
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className={`text-sm font-medium ${language === 'en' ? 'text-white' : 'text-gray-400'}`}>
                    EN
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-36">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Subtle additional effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-gray-300">
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                {t.hero.title}
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-lg drop-shadow-md">
                {t.hero.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                {t.hero.viewPortfolio}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button className="bg-blue-900/80 backdrop-blur-sm hover:bg-blue-800 text-white border-blue-800 px-8 py-3 rounded-lg font-medium transition-all duration-300">
                {t.hero.contact}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-1 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-700/80 to-gray-900/80 backdrop-blur-sm rounded-[22px] flex items-center justify-center relative overflow-hidden border border-white/10">
                {/* Try to load video first, fallback to placeholder */}
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-[22px]"
                  onError={(e) => {
                    // Hide video and show placeholder if video fails to load
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                  ref={videoRef}
                >
                  <source src="/TVC%20Tu%20Nguyen%20Film%20.mp4" type="video/mp4" />
                  <source src="/TVC%20Tu%20Nguyen%20Film%20.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Fallback placeholder (hidden by default, shown if video fails) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                    <p className="text-white/90 font-medium">{t.hero.demoReel}</p>
                    <p className="text-white/70 text-sm">Click to play video</p>
                  </div>
                </div>

                {/* Fullscreen button overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-[22px]"
                  onClick={handleFullscreen}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Maximize className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section className="py-32 px-6 bg-gray-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/ẢNH BÌA CTY.png"
            alt="TN Films Company Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gray-900/85"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/90"></div>
        </div>

        {/* Enhanced background effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
                {t.portfolio.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {t.portfolio.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Personal Project */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full" onClick={() => {
              navigate('/personal-project');
              window.scrollTo(0, 0);
            }}>
              <div className="text-center space-y-6 h-full flex flex-col justify-between">
                {/* Modern Square Container with Video */}
                <div className="relative w-72 h-72 mx-auto">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 opacity-90"></div>
                  
                  {/* Main container with video */}
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
                    {/* Personal Project Video */}
                    <img 
                      src="/project-thumbnail.png"
                      alt="PTSC Hai Phong Industrial Operations"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    
                    {/* Fallback content if video fails to load */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60" style={{display: 'none'}}>
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-500/30 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-500/40 transition-colors duration-300 backdrop-blur-sm border border-blue-400/30">
                          <Camera className="w-12 h-12 text-blue-200" />
                        </div>
                        <div className="space-y-3">
                          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto rounded-full shadow-lg"></div>
                          <div className="w-12 h-1 bg-gradient-to-r from-blue-400/60 to-blue-500/60 mx-auto rounded-full"></div>
                          <div className="w-8 h-1 bg-gradient-to-r from-blue-400/30 to-blue-500/30 mx-auto rounded-full"></div>
                        </div>
                        <div className="text-sm font-medium text-blue-200 tracking-wider uppercase bg-blue-900/50 px-3 py-1 rounded-full backdrop-blur-sm">Portfolio</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl opacity-60 group-hover:opacity-90 group-hover:-rotate-12 transition-all duration-300 shadow-lg"></div>
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">{t.portfolio.personal.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed max-w-xs mx-auto transition-colors duration-300 min-h-[3rem]">
                      {t.portfolio.personal.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 font-medium px-6 py-3 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                      {t.portfolio.personal.button} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Work */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full" onClick={() => {
              navigate('/commercial-work');
              window.scrollTo(0, 0);
            }}>
              <div className="text-center space-y-6 h-full flex flex-col justify-between">
                {/* Modern Square Container with Image */}
                <div className="relative w-72 h-72 mx-auto">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110 opacity-90"></div>
                  
                  {/* Main container with image */}
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl border border-orange-500/20 group-hover:border-orange-400/40 transition-all duration-500 overflow-hidden">
                    {/* Image Background */}
                    <img 
                      src="/PTSCHaiPhong7.jpg"
                      alt="PTSC Hai Phong Industrial Operations"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    
                    {/* Overlay content */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60">
                      <div className="text-center space-y-6">
                        
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl opacity-60 group-hover:opacity-90 group-hover:-rotate-12 transition-all duration-300 shadow-lg"></div>
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300">{t.portfolio.commercial.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed max-w-xs mx-auto transition-colors duration-300 min-h-[3rem]">
                      {t.portfolio.commercial.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 font-medium px-6 py-3 rounded-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
                      {t.portfolio.commercial.button} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Events */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full" onClick={() => {
              navigate('/events');
              window.scrollTo(0, 0);
            }}>
              <div className="text-center space-y-6 h-full flex flex-col justify-between">
                {/* Modern Square Container with Video */}
                <div className="relative w-72 h-72 mx-auto">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl group-hover:shadow-green-500/50 transition-all duration-500 group-hover:scale-110 opacity-90"></div>
                  
                  {/* Main container with video */}
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl border border-green-500/20 group-hover:border-green-400/40 transition-all duration-500 overflow-hidden">
                    {/* Video Background */}
                    <img 
                      src="/YEP_2025_TRAN_QUANG_3_01.jpg"
                      alt="PTSC Hai Phong Industrial Operations"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    
                    {/* Overlay content */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60">
                      
                    </div>
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-300 to-green-400 rounded-xl opacity-60 group-hover:opacity-90 group-hover:-rotate-12 transition-all duration-300 shadow-lg"></div>
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-green-100 transition-colors duration-300">{t.portfolio.events.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed max-w-xs mx-auto transition-colors duration-300 min-h-[3rem]">
                      {t.portfolio.events.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-500/20 font-medium px-6 py-3 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                      {t.portfolio.events.button} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-16"></div>
      {/* Services Section */}
      {/* <section className="py-24 px-6 bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Dịch vụ</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Chuyên nghiệp - Sáng tạo - Đẳng cấp</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Quay phim</h3>
              <p className="text-gray-400 text-sm">Video chất lượng cao</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Chụp ảnh</h3>
              <p className="text-gray-400 text-sm">Hình ảnh chuyên nghiệp</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Film className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Post Production</h3>
              <p className="text-gray-400 text-sm">Chỉnh sửa và hoàn thiện</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Creative Direction</h3>
              <p className="text-gray-400 text-sm">Ý tưởng sáng tạo</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="container mx-auto text-center">
          <div className="space-y-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {t.contact.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="flex items-center space-x-3 bg-gray-800 rounded-lg px-6 py-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-300 font-medium">contact@tunguyen.film</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800 rounded-lg px-6 py-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-300 font-medium">+84 123 456 789</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Section 1: Company Info */}
            <div className="space-y-6">
              <div className="mb-4">
                <img 
                  src="/logo_transparent.png" 
                  alt="TN Films Logo" 
                  className="h-40 w-auto hover:scale-105 transition-all duration-300 cursor-pointer filter drop-shadow-lg"
                />
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors cursor-pointer">
                  <Camera className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <Film className="w-5 h-5 text-purple-400" />
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-colors cursor-pointer">
                  <Video className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            {/* Section 2: Services & Contact */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {t.footer.servicesTitle}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <a href="mailto:tu.nguyenfilm@gmail.com" className="hover:underline">
                    Email: tu.nguyenfilm@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-orange-400" />
                  </div>
                  <a href="https://www.facebook.com/TuNguyenFilm" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    TuNguyen Film fanpage
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <a href="tel:+84123456789" className="hover:underline">
                    +84123456789
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
