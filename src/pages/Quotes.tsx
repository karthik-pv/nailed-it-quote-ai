
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  MoreVertical,
  FileText,
  Eye,
  Edit,
  Trash2,
  ArrowLeft
} from "lucide-react";

const Quotes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const quotes = [
    {
      id: "Q-2024-001",
      customer: "John Smith",
      project: "Backyard Fence Installation",
      amount: "$2,450",
      status: "pending",
      date: "Dec 15, 2024",
      items: 3
    },
    {
      id: "Q-2024-002",
      customer: "Sarah Johnson",
      project: "Commercial Fence Repair",
      amount: "$850",
      status: "approved",
      date: "Dec 14, 2024",
      items: 2
    },
    {
      id: "Q-2024-003",
      customer: "Mike Davis",
      project: "Pool Area Fencing",
      amount: "$3,200",
      status: "draft",
      date: "Dec 13, 2024",
      items: 5
    },
    {
      id: "Q-2024-004",
      customer: "Lisa Brown",
      project: "Privacy Fence Installation",
      amount: "$1,950",
      status: "sent",
      date: "Dec 12, 2024",
      items: 4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
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
                className="glass-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotes</h1>
                <p className="text-gray-600">Manage and track all your quotes</p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white glass-button"
              onClick={() => navigate('/dashboard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input 
                placeholder="Search quotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-card border-0 pl-10"
              />
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="grid gap-4">
          {quotes.map((quote, index) => (
            <Card key={quote.id} className="glass p-6 hover:glass-card transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{quote.id}</h3>
                      <Badge className={`${getStatusColor(quote.status)} text-xs`}>
                        {quote.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{quote.customer} • {quote.project}</p>
                    <p className="text-sm text-gray-500">{quote.date} • {quote.items} items</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{quote.amount}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="glass-button">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="glass-button">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="glass-button">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
