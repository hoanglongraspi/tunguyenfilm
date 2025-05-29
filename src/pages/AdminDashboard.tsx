import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Film, 
  Image, 
  Users, 
  Eye, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  FileText,
  Video,
  Mail
} from "lucide-react";
import PortfolioManager from "@/components/admin/PortfolioManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const stats = [
    {
      title: "Personal Projects",
      count: "12",
      icon: Camera,
      color: "blue",
      change: "+2 this month"
    },
    {
      title: "Commercial Works",
      count: "8",
      icon: Film,
      color: "orange",
      change: "+1 this month"
    },
    {
      title: "Events",
      count: "25",
      icon: Image,
      color: "green",
      change: "+5 this month"
    },
    {
      title: "Total Views",
      count: "15.2K",
      icon: Eye,
      color: "purple",
      change: "+12% this month"
    }
  ];

  const recentActivities = [
    {
      action: "Added new personal project",
      project: "Street Photography Series",
      time: "2 hours ago",
      type: "personal"
    },
    {
      action: "Updated commercial work",
      project: "Brand Campaign for XYZ Corp",
      time: "5 hours ago",
      type: "commercial"
    },
    {
      action: "Added wedding event",
      project: "Wedding of John & Jane",
      time: "1 day ago",
      type: "event"
    },
    {
      action: "Updated website content",
      project: "Hero section text",
      time: "2 days ago",
      type: "content"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "personal": return <Camera className="w-4 h-4 text-blue-400" />;
      case "commercial": return <Film className="w-4 h-4 text-orange-400" />;
      case "event": return <Image className="w-4 h-4 text-green-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.count}</p>
                        <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    className="h-20 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 flex flex-col space-y-2"
                    onClick={() => setActiveTab("personal")}
                  >
                    <Plus className="w-6 h-6 text-blue-400" />
                    <span className="text-blue-300">Add Personal Project</span>
                  </Button>
                  
                  <Button 
                    className="h-20 bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30 flex flex-col space-y-2"
                    onClick={() => setActiveTab("commercial")}
                  >
                    <Plus className="w-6 h-6 text-orange-400" />
                    <span className="text-orange-300">Add Commercial Work</span>
                  </Button>
                  
                  <Button 
                    className="h-20 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 flex flex-col space-y-2"
                    onClick={() => setActiveTab("events")}
                  >
                    <Plus className="w-6 h-6 text-green-400" />
                    <span className="text-green-300">Add Event</span>
                  </Button>
                  
                  <Button 
                    className="h-20 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 flex flex-col space-y-2"
                    onClick={() => setActiveTab("media")}
                  >
                    <Video className="w-6 h-6 text-purple-400" />
                    <span className="text-purple-300">Upload Media</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-xs">{activity.project}</p>
                      </div>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "personal":
        return <PortfolioManager category="personal" />;
      
      case "commercial":
        return <PortfolioManager category="commercial" />;
      
      case "events":
        return <PortfolioManager category="events" />;
      
      default:
        return (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white capitalize">{activeTab} Management</CardTitle>
            </CardHeader>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700/50 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
                <p className="text-gray-400 mb-6">
                  The {activeTab} management interface is under development.
                </p>
                <Button 
                  onClick={() => setActiveTab("overview")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Back to Overview
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TN Films CMS</h1>
                <p className="text-sm text-gray-400">Content Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Website
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 rounded-xl p-1 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "personal", label: "Personal Projects", icon: Camera },
              { id: "commercial", label: "Commercial Work", icon: Film },
              { id: "events", label: "Events", icon: Image },
              { id: "content", label: "Website Content", icon: FileText },
              { id: "media", label: "Media Library", icon: Video },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard; 