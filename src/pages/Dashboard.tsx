
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Bell,
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  FileText,
  Calendar,
  Settings,
  Crown,
  CheckCircle,
  MoreVertical,
  User
} from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      title: "Total Quotes",
      value: "24",
      change: "+12%",
      positive: true,
      icon: FileText
    },
    {
      title: "Active Customers",
      value: "18",
      change: "+8%",
      positive: true,
      icon: Users
    },
    {
      title: "Revenue (MTD)",
      value: "$12,450",
      change: "+23%",
      positive: true,
      icon: DollarSign
    },
    {
      title: "Avg Response Time",
      value: "2.4 hrs",
      change: "-15%",
      positive: true,
      icon: Clock
    }
  ];

  const recentQuotes = [
    {
      id: "Q-2024-001",
      customer: "John Smith",
      project: "Backyard Fence Installation",
      amount: "$2,450",
      status: "pending",
      time: "2 hours ago"
    },
    {
      id: "Q-2024-002",
      customer: "Sarah Johnson",
      project: "Commercial Fence Repair",
      amount: "$850",
      status: "approved",
      time: "5 hours ago"
    },
    {
      id: "Q-2024-003",
      customer: "Mike Davis",
      project: "Pool Area Fencing",
      amount: "$3,200",
      status: "draft",
      time: "1 day ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass border-r border-white/20 z-40">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold gradient-text">NailedIt</span>
          </div>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start glass-button text-blue-600 bg-blue-50">
              <FileText className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
              <FileText className="w-4 h-4 mr-3" />
              Quotes
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
              <Users className="w-4 h-4 mr-3" />
              Customers
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
              <Calendar className="w-4 h-4 mr-3" />
              Schedule
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-white/50">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </nav>

          <div className="mt-8">
            <Card className="glass-card p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">Upgrade to Pro</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Unlock unlimited quotes and advanced features
              </p>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                Upgrade Now
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="glass border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-card border-0 pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="glass-button">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2 glass-card px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounde

d-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Quotes */}
            <div className="lg:col-span-2">
              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Quotes</h3>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white glass-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Quote
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentQuotes.map((quote, index) => (
                    <div key={quote.id} className="glass-card p-4 hover:glass transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-medium text-gray-900">{quote.id}</span>
                            <Badge className={`${getStatusColor(quote.status)} text-xs`}>
                              {quote.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            {quote.customer} • {quote.project}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {quote.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            {quote.amount}
                          </div>
                          <Button variant="ghost" size="sm" className="p-1">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions & AI Status */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start glass-button">
                    <Plus className="w-4 h-4 mr-3" />
                    Create New Quote
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-card border-0">
                    <Users className="w-4 h-4 mr-3" />
                    Add Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-card border-0">
                    <Calendar className="w-4 h-4 mr-3" />
                    Schedule Job
                  </Button>
                </div>
              </Card>

              {/* AI Training Status */}
              <Card className="glass p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Training Status</h3>
                    <p className="text-sm text-green-600">Training Complete</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  AI is ready to generate quotes
                </p>
                <p className="text-xs text-gray-500">
                  Your AI has been trained on your pricing document and is ready to help generate 
                  professional quotes based on your business model.
                </p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
