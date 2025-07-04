import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

const Schedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const jobs = [
    {
      id: 1,
      title: "Backyard Fence Installation",
      customer: "John Smith",
      date: "Dec 20, 2024",
      time: "9:00 AM - 2:00 PM",
      location: "123 Main St, Springfield, IL",
      status: "scheduled",
      priority: "high"
    },
    {
      id: 2,
      title: "Commercial Fence Repair",
      customer: "Sarah Johnson",
      date: "Dec 21, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "456 Oak Ave, Chicago, IL",
      status: "confirmed",
      priority: "medium"
    },
    {
      id: 3,
      title: "Pool Area Fencing",
      customer: "Mike Davis",
      date: "Dec 22, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "789 Pine St, Rockford, IL",
      status: "pending",
      priority: "low"
    },
    {
      id: 4,
      title: "Privacy Fence Installation",
      customer: "Lisa Brown",
      date: "Dec 23, 2024",
      time: "8:00 AM - 3:00 PM",
      location: "321 Elm St, Peoria, IL",
      status: "scheduled",
      priority: "high"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="glass-button shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
                <p className="text-gray-600">Manage your job schedule and appointments</p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white glass-button shadow-sm"
              onClick={() => navigate('/dashboard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Job
            </Button>
          </div>

          {/* Calendar Navigation */}
          <Card className="glass p-4 mb-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="glass-button shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">
                December 2024
              </h2>
              <Button variant="ghost" size="sm" className="glass-button shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Card key={job.id} className="glass p-6 hover:glass-card transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={`${getStatusColor(job.status)} text-xs`}>
                        {job.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(job.priority)} text-xs`}>
                        {job.priority} priority
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        {job.customer}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {job.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button size="sm" className="glass-button shadow-sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card border-0 shadow-sm">
                    Reschedule
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
