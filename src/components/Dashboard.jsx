import { 
  Bell, 
  Mail, 
  Home,
  User,
  // Menu,
  // ChevronRight,
  FileText,
  Search,
  PenTool,
  // MessageSquare,
  // Save,
  // Upload
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Dashboard = () => {
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  // const [activePage, setActivePage] = useState(null);

  // Define pages configuration
  const pages = [
    {
      id: 'extract',
      title: 'Extract',
      icon: <FileText size={20} />,
      description: 'Extract key information from legal documents',
      points: [
        'Automated text extraction',
        'Key clause identification',
        'Document summarization',
        'Entity recognition'
      ],
      url:"/ExtractChat"
    },
    {
      id: 'research',
      title: 'Research Memo',
      icon: <Search size={20} />,
      description: 'Generate comprehensive legal research memos',
      points: [
        'Case law analysis',
        'Jurisdiction-specific research',
        'Citation formatting',
        'Legal precedent search'
      ],
      url:"/ResearchChat"

    },
    {
      id: 'autodraft',
      title: 'AutoDraft',
      icon: <PenTool size={20} />,
      description: 'Automated legal document drafting',
      points: [
        'Template-based drafting',
        'Custom clause library',
        'Multiple format support',
        'Version control'
      ],
      url:"/AutoDraftChat"  
    },
    // {
    //   id: 'doctalk',
    //   title: 'DocTalk',
    //   icon: <MessageSquare size={20} />,
    //   description: 'Interactive document analysis and Q&A',
    //   points: [
    //     'Document Q&A',
    //     'Contextual analysis',
    //     'Multi-document linking',
    //     'Smart suggestions'
    //   ],
    //   url:"/DocTalkChat"
    // }
  ];



  const CardsGrid = () => (
    <div className="p-6">
      <div className="flex flex-wrap -mx-3">
        {pages.map((page) => (
          
          <div key={page.id} className="w-full sm:w-1/2 px-3 mb-6">
            <NavLink to={page.url}>
              <Card 
              className="h-full p-6 cursor-pointer hover:shadow-lg  hover:bg-orange-50 transition-shadow"
              // onClick={() => setActivePage(page)}
            >
              <div className="flex items-center gap-3 mb-4">
                {page.icon}
                <h3 className="text-xl font-bold">{page.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{page.description}</p>
              <ul className="space-y-2">
                {page.points.map((point, index) => (
                  <li key={index} className="text-gray-600 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
            </NavLink>
            
          </div>
        ))}
      </div>
    </div>
  );

  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <div className="bg-white p-4 shadow-md flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            // onClick={() => setActivePage(null)}
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <CardsGrid />
      </div>
    </div>
  );
};

export default Dashboard;